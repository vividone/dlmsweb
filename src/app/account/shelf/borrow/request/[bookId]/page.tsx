
"use client";

import { FaArrowLeft } from "react-icons/fa";
import { useState, use, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "@/helpers/useCookies";
import Header from "@/components/header/header";
import { Book } from "@/app/account/library/page";
import axios from "axios";
import { useLocalStorage } from "@/helpers/useLocalStorage";

export default function BookId({ params }: { params: Promise<{bookId: string}> }) {
    const router = useRouter();
    const { bookId } = use(params);
    const [collectionDate, setCollectionDate] = useState<string>("");
    const [returnDate, setReturnDate] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [book, setBook] = useState<Book>()
    const { getCookies } = useCookies();
    const [user, ] = useLocalStorage("user", [])
    const [, setBorrow ] = useLocalStorage("borrow", {})

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await axios.get(`https://dlms-backend.onrender.com/books/${bookId}`, {
            headers: {
              Authorization: `Bearer ${getCookies().access_token}`,
            },
          });
          setBook(response.data);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookId])
   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!collectionDate || !returnDate) {
            setError('Please fill in all the required fields.');
            return;
        }
    
        const payload = {
            userId: user.id,
            bookId: book?.id.toString(),
            borrowDate: new Date(collectionDate),
            dueDate: new Date(returnDate),
        };
    
        try {
            const response = await fetch(`https://dlms-backend.onrender.com/borrow/${user.id}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookies().access_token}`,
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Please try again.");
            } else {
                response.json().then(data => setBorrow(data))
                router.push('/account/shelf/borrow/confirmation');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    if (!book) {
        return <p>Book not found.</p>;
    }

    return (
        <div className="container mx-auto p-4">
          {/* Header */}
          <Header />


          {/*Arrow Redirect */}
            <div className="flex items-center mb-4">
                <Link href="/book/1">
                    <FaArrowLeft className="text-md text-gray-800 cursor-pointer hover:text-blue-500" />
                </Link>
            </div>
           
           <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6 mt-14">
            {/* Book Section */}
            <Image 
            src={"/" + book.title + ".png"} 
            alt={book.title} 
            width={270} height={50} 
            className="mt-0 rounded-md" 
            />

            <div className="mt-6 sm:mt-0 sm:w-1/2 w-full text-center sm:text-left">
                <h2 className="font-sans text-2xl font-semibold text-blue-900 p-2">You are booking:</h2>
                <h3 className="text-xl text-black font-semibold">{book.title}</h3>
                 
            {/*Form submission + Logic */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-8 text-black">
                    <label className="font-sans text-sm font-semibold text-black">Collection Date</label>
                    <input 
                        type="date" 
                        value={collectionDate}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-4 py-3 border rounded-md text-black bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        style={{
                          color: collectionDate ? "black" : "gray",
                        }}
                        onChange={(e) => setCollectionDate(e.target.value)} 
                        required 
                    />

                    <label className="font-sans text-sm font-semibold text-black">Return Date</label>
                    <input 
                        type="date" 
                        value={returnDate}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-4 py-3 border rounded-md text-black bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                         style={{
                           color: returnDate ? "black" : "gray",
                         }}
                        onChange={(e) => setReturnDate(e.target.value)} 
                        required 
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-center p-8 items-center">
                      
                        <button type="submit" onClick={handleSubmit} className="bg-blue-600 w-72 text-white rounded-md items-center p-2 hover:bg-blue-700">
                            Submit
                        </button>
                    
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

