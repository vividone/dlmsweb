"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import { FaBell, FaArrowLeft, FaBars } from "react-icons/fa";
import Link from "next/link";
import { use } from 'react';
import { useState, useEffect, useRef } from 'react';

// Sample book data
const books = [
  { id: 1,  title: "Lone Wolf Adventure", category: "Sci-fi", author: 'Emerngard Nausicaa', cover: "/lone wolf.png", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 2,  title: "Hide and Seek", category: "Fantasy", author: 'Olivia Wilson', cover: "/Hide and seek.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 3,  title: "Dont Look Back", category: "Drama", author:'Isaac Nelson', cover: "/Dont Look.png", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 4,  title: "Spring Book", category: "Romance", author:'Deena Roberts', cover: "/spring book.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 5,  title: "Harry Potter", category: "Business", author:'Isaac Nelson', cover: "/harry potter.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 6,  title: "A Promise Kept", category: "Fantasy", author:'Robert Lee Hatcher', cover: "/Robin lee.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 7,  title: "Dont Look Back", category: "Drama", author: 'Isaac Nelson', cover: "/Dont Look.png", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 8,  title: "Hide and Seek", category: "Fantasy", author:'Olivia Wison', cover: "/Hide and seek.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 9,  title: "Harry Potter", category: "Business", author:'Isaac Nelson', cover: "/harry potter.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 10, title: "A Promise Kept", category: "Fantasy", author:'Robert Lee Hatcher', cover: "/Robin lee.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 11, title: "Lone Wolf Adventure", category: "Sci-fi", author:'Emerngard Nausica', cover: "/lone wolf.png", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
  { id: 12, title: "Spring Book", category: "Romance", author:'Deena Roberts', cover: "/spring book.jpg", synopsis: "Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night."},
];

// Book details component
export default function BookId({ params }: { params: Promise<{ bookId: string }> }) {
  const router = useRouter();
  const { bookId } = use(params);
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dlms-backend.onrender.com/api/book/${bookId}`);
        
        if (!res.ok) throw new Error("Book not found");

        const data = await res.json();
        setBook(data); 
        setLoading(false); 
      } catch (err) {
        setError("Failed to load book details.");
        setLoading(false); 
      }
    };

    fetchBook();
  }, [bookId]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handleBorrowClick = () => {
    if (book) router.push("/borrow-page/1");
  };

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  const handleClickOutside = (event: MouseEvent) => {
    // close dropdown if clicked
    if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }

    // close menu if clicked outside
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header section */}
      <header className="flex items-center justify-between sm:flow-row mb-8 space-y-4 sm:space-y-0">
        <div className='flex items-center space-x-8'>
        <h1 className="text-3xl font-bold text-[#0061E8]">BookaThon</h1>
        
        {/*full nav links for larger screen */}
         <nav className='hidden sm:flex space-x-6 px-6'>
        <Link href="/homepage" className="text-[#0061E8] font-semibold hover:text-blue-500">
        Library
        </Link>
        <Link href="/dashboard" className="text-black  font-semibold hover:text-blue-500">
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
        <div className="flex items-center space-x-2 sm:space-x-4 absolute top-2 pr-6 right-0 sm:absolute top-2">
          <FaBell className="text-sm text-gray-600 cursor-pointer hover:text-blue-500" />
          <Image 
          src="/user-avatar.jpg" 
          alt="Avatar" width={20} height={10} 
          className="w-6 h-6 border rounded-full cursor-pointer" 
          onClick={() => setDropdownOpen(!dropdownOpen)} 
          />
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 sm:right-0 text-sm bg-white border rounded-md shadow-lg">
             <Link href="/sign-in">
                  <div className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">Sign In</div>
                </Link>
                <Link href="/homepage">
                  <div className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">Sign Out</div>
                </Link>
            </div>
          )}
      </div>
      </header>

      {/* Book Details */}
      <div className="relative flex text-black flex-col sm:flex-row sm:items-start sm:space-x-6 mt-14">
         {/*Arrow left */}  
          <Link href={'/homepage'}>
            <FaArrowLeft className="absolute top-0 left-0 ml-2 mt-2 text-md cursor-pointer hover:text-blue-500" />
          </Link>
        
        {/*Book cover and Content */}
        <div className='flex flex-col sm:flex-row sm:items-start sm:space-x-6 mt-14'>
        <Image 
        src={book.cover} 
        alt={book.title} 
        width={270} 
        height={50} 
        className="mt-0 rounded-md" />
       
        <div className="mt-6 sm:mt-0 sm:w-1/2 w-full text-center sm:text-left">
            <h2 className="text-gray-800 text-lg mb-4 sm:mb-2"><strong>AUTHOR:</strong> {book.author}</h2>
            <h2 className="text-gray-800 text-lg mb-4 sm:mb-2"><strong>STATUS:</strong> {book.category}</h2>
          <h2 className="text-gray-800 text-md"><strong> SYNOPSIS</strong> <br /> <br />{book.synopsis}</h2>
          </div>
           
          </div>
      </div>

      {/* Borrow Button */}
      <div className="flex justify-center p-4 md:relative bottom-8 items-center">
        
        <button 
          type='submit'
          onClick={handleBorrowClick}
          className="bg-blue-600 w-72 text-white rounded-md items-center p-2 hover:bg-blue-700"
        >
          Borrow This Book 
        </button>
      </div>
      </div>
  );
}
