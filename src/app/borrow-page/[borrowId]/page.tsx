"use client";

import { FaBell, FaArrowLeft } from "react-icons/fa";
import { useState, useEffect, useRef, use } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

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
    const borrow = books.find((b) => b.id === parseInt(borrowId, 10));
    const [collectionDate, setCollectionDate] = useState<string>('');
    const [returnDate, setReturnDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/borrow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collectionDate, returnDate }),
        });

        if (response.ok) {
            alert('Request Sent Successfully');
            router.push('/borrowing-confirmation');
        } else {
            setError('Failed to send the request. Please try again.');
        }
    };

    if (!borrow) {
        return <p>Book not found.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-[#0061E8]">BookaThon</h1>
                <div className="flex items-center space-x-4">
                    <Link href="/homepage" className="font-semibold text-[#0061E8] md:absolute right-[680px] hover:text-blue-500">Library</Link>
                    <Link href="/dashboard" className="font-semibold md:relative right-[440px] hover:text-blue-500">My Shelf</Link>
                    <FaBell className="text-lg text-gray-600 cursor-pointer hover:text-blue-500" />
                    <Image src="/user-avatar.jpg" alt="Avatar" width={40} height={20} className="w-8 h-8 border rounded-full cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)} />
                    {dropdownOpen && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                            <Link href="/sign-in">
                                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign In</div>
                            </Link>
                            <Link href="/signout">
                                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign Out</div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center mb-4">
                <Link href="/book/1">
                    <FaArrowLeft className="text-md text-gray-700 cursor-pointer hover:text-blue-500" />
                </Link>
            </div>
           
            {/* Borrow Section */}
            <Image src={borrow.cover} alt={borrow.title} width={270} height={50} className="mt-14 rounded-md" />
            <div className="flex flex-col items-center">
                <h2 className="font-sans text-2xl font-semibold text-blue-900 md:absolute top-[180px] md:absolute left-[460px]">You are borrowing:</h2>
                <h3 className="text-xl font-semibold md:absolute top-[220px] md:absolute left-[460px]">{borrow.title}</h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-12 w-full max-w-md md:absolute top-[250px] md:absolute left-[460px]">
                    <label className="font-sans text-sm font-semibold">Collection Date</label>
                    <input 
                        type="text" 
                        value={collectionDate}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-4 py-3 border rounded-md" 
                        onChange={(e) => setCollectionDate(e.target.value)} 
                        required 
                    />

                    <label className="font-sans text-sm font-semibold">Return Date</label>
                    <input 
                        type="text" 
                        value={returnDate}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-4 py-3 border rounded-md" 
                        onChange={(e) => setReturnDate(e.target.value)} 
                        required 
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-center p-8 items-center">
                        <button type="submit" className="bg-blue-600 w-72 text-white rounded-md items-center p-2 hover:bg-blue-700">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
