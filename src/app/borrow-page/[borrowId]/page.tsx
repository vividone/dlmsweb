
"use client";

import { FaBell, FaArrowLeft, FaBars } from "react-icons/fa";
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
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const[menuOpen, setMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    const handleClickOutside = (event: MouseEvent) => {
      // close dropdown if clicked
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }

      // close menu if clicked outside 
      if(menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
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
             {/* Header */}
            <header className="flex justify-between items-center sm:flex-row mb-8 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-8">
                <h1 className="text-3xl font-bold text-[#0061E8]">BookaThon</h1>
               
                {/*full nav links for larger screen */}
                <nav className="hidden sm:flex space-x-6">
                    <Link href="/homepage" className="font-semibold text-[#0061E8] text-base sm:text-base hover:text-blue-500">
                    Library
                    </Link>
                    <Link href="/dashboard" className="text-black font-semibold text-base sm:text-base hover:text-blue-500">
                    My Shelf
                    </Link>
                    </nav>

{/* Notification, Profile, and Hamburger Menu for mobile */}
  <div className="flex items-center space-x-2 sm:space-x-4 absolute top-2 pr-6 right-0 sm:absolute top-2">
    {/* Mobile hamburger menu */}
    <div className="sm:hidden flex items-center text-black absolute top-5 right-20">
      <FaBars 
        className="text-md cursor-pointer" 
        onClick={() => setMenuOpen(!menuOpen)} 
      />
         {/* Conditionally render the pop-up menu with smooth transition */}
    {menuOpen && (
      <div 
        ref={menuRef}
        className="absolute top-12 right-0 w-48 bg-white border rounded-md shadow-lg z-10 transition-all duration-300 transform opacity-100 scale-100"
        style={{
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'scale(1)' : 'scale(0.95)',
        }}
      >
        <Link href="/homepage">
          <div className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
            Library
          </div>
        </Link>
        <Link href="/dashboard">
          <div className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
            My Shelf
          </div>
        </Link>
      </div>
    )}
    </div>
    </div>
    </div>
                 
                {/* Notification and Profile */}
                    <div className="flex items-center space-x-2 sm:space-x-2 absolute top-2 pr-6 right-0 sm:absolute top-2">
                    <FaBell className="text-sm text-gray-600 cursor-pointer hover:text-blue-500" />
                    <Image 
                    src="/user-avatar.jpg" 
                    alt="Avatar" 
                    width={20} 
                    height={10} 
                    className="w-6 h-6 border rounded-full cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                    />
                    {dropdownOpen && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 sm:right-0 text-sm bg-white border rounded-md shadow-lg">
                            <Link href="/sign-in">
                                <div className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                                    Sign In
                                </div>
                            </Link>
                            <Link href="/homepage">
                                <div className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">Sign Out</div>
                            </Link>
                        </div>
                    )}
                </div>
            </header>

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
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-8">
                    <label className="font-sans text-sm font-semibold text-black">Collection Date</label>
                    <input 
                        type="text" 
                        value={collectionDate}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-4 py-3 border rounded-md text-black" 
                        onChange={(e) => setCollectionDate(e.target.value)} 
                        required 
                    />

                    <label className="font-sans text-sm font-semibold text-black">Return Date</label>
                    <input 
                        type="text" 
                        value={returnDate}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-4 py-3 border rounded-md text-black" 
                        onChange={(e) => setReturnDate(e.target.value)} 
                        required 
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-center p-8 items-center">
                        <Link href='/borrowing-confirmation'>
                        <button type="submit" className="bg-blue-600 w-72 text-white rounded-md items-center p-2 hover:bg-blue-700">
                            Submit
                        </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}
