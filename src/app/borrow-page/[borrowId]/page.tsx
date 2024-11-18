
"use client";

import { FaArrowLeft } from "react-icons/fa";
import { useState, use } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useLocalStorage } from "@/helpers/useLocalStorage";
import { useCookies } from "@/helpers/useCookies";
import Header from "@/components/header/header";
import { useUser } from "../../../context/UserContext/page"

// Sample book data
const books = [
  { id: 1,  title: "Lone Wolf Adventure", category: "Adventure", author: 'Emerngard Nausicaa', cover: "/lone wolf.png", synopsis: "..." },
  { id: 2,  title: "Hide and Seek", category: "Mystery", author: 'Olivia Wilson', cover: "/Hide and seek.jpg", synopsis: "..." },
  { id: 3,  title: "Dont Look Back", category: "Thriller", author:'Isaac Nelson', cover: "/Dont Look.png", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 4,  title: "Spring Book", category: "Romance", author:'Deena Roberts', cover: "/spring book.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 5,  title: "Harry Potter", category: "Fantasy", author:'Isaac Nelson', cover: "/harry potter.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 6,  title: "A Promise Kept", category: "Drama", author:'Robert Lee Hatcher', cover: "/Robin lee.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 7,  title: "Dont Look Back", category: "Thriller", author: 'Isaac Nelson', cover: "/Dont Look.png", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 8,  title: "Hide and Seek", category: "Mystery", author:'Olivia Wison', cover: "/Hide and seek.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 9,  title: "Harry Potter", category: "Fantasy", author:'Isaac Nelson', cover: "/harry potter.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 10, title: "A Promise Kept", category: "Drama", author:'Robert Lee Hatcher', cover: "/Robin lee.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 11, title: "Lone Wolf Adventure", category: "Adventure", author:'Emerngard Nausica', cover: "/lone wolf.png", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 12, title: "Spring Book", category: "Romance", author:'Deena Roberts', cover: "/spring book.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
];

export default function BorrowId({ params }: { params: Promise<{borrowId: string}> }) {
    const router = useRouter();
    const { borrowId } = use(params);
    // const { user } = useUser(); // Access the user context
    const borrow = books.find((b) => b.id === parseInt(borrowId, 10));
    const [collectionDate, setCollectionDate] = useState<string>("");
    const [returnDate, setReturnDate] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [user] = useLocalStorage("user", {})
    const { getCookies } = useCookies()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`https://dlms-backend.onrender.com/borrow/${user.id}`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getCookies()["access_token"]}`
            },
            body: JSON.stringify({ borrowDate: collectionDate, dueDate: returnDate, bookId: borrow?.id.toString(), userId: user.id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('Error:', errorData);
          setError('Failed to send the request. Please try again.');
      } else {
          alert('Request Sent Successfully');
          router.push('/borrowing-confirmation');
      }
    };

    if (!borrow) {
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
           
           <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 mt-14">
            {/* Borrow Section */}
            <Image 
            src={borrow.cover} 
            alt={borrow.title} 
            width={270} height={50} 
            className="mt-0 rounded-md" 
            />

            <div className="mt-6 sm:mt-0 sm:w-1/2 w-full text-center sm:text-left">
                <h2 className="font-sans text-2xl font-semibold text-blue-900 p-2">You are borrowing:</h2>
                <h3 className="text-xl text-black font-semibold">{borrow.title}</h3>
                 
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
