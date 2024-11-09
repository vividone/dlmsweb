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
  const book = books.find((b) => b.id === parseInt(bookId, 10));
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const[menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!book) {
    return <p>Book not found.</p>;
  }

  const handleBorrowClick = () => {
    router.push(`/borrowing-page?title=${encodeURIComponent(book.title)}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
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
        <Link href="/dashboard" className="text-gray-700  font-semibold hover:text-blue-500">
        My Shelf
        </Link>
        </nav>
      
      {/* Hamburger menu for mobile */}
      <div className="sm:hidden flex items-center">
            <FaBars className="text-md cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            />
            
            {menuOpen && (
            <div className="absolute top-16 left-4 right-4 bg-white border rounded-sm shadow-lg z-10">
              <Link href="/homepage">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Library
                </div>
              </Link>
              <Link href="/dashboard">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  My Shelf
                </div>
              </Link>
            </div>
          )}
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
                  <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign In</div>
                </Link>
                <Link href="/signout">
                  <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign Out</div>
                </Link>
            </div>
          )}
      </div>
      </header>

      {/* Book Details */}
      <div className="flex gap-8 p-8">
       
         {/*Arrow left */}  
          <Link href={'/homepage'}>
            <FaArrowLeft className="text-lg absolute left-32 text-gray-600 cursor-pointer hover:text-blue-500" />
          </Link>
        
        {/*Book cover and Content */}
        <Image 
        src={book.cover} 
        alt={book.title} 
        width={270} 
        height={50} 
        className="mt-14 rounded-md h:10" />
        <div className="flex flex-col justify-between">
          <div className='flow-root float-left sm:float-end sm:text-md md:text-md'>
            <h2 className="mt-1 p-14 text-lg text-gray-600"><strong>AUTHOR:</strong> {book.author}</h2>
            <h2 className="text-gray-600 ml-14 text-lg"><strong>STATUS:</strong> {book.category}</h2>
          <h2 className="mt-4 text-gray-700 ml-14 m-2"><strong> SYNOPSIS</strong> <br /> <br />{book.synopsis}</h2>
          </div>

           <div className='flex justify-center'>
          <Link href='/borrow-page/1'>
          <button className="mt-6 bg-blue-600 text-white px-2 py-2 w-60 rounded-md gap-2"
          onClick={handleBorrowClick}>
            Borrow This Book
          </button>
          </Link>  
          </div>
        </div>
      </div>
      </div>
  );
}
