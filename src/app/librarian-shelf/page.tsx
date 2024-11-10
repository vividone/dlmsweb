"use client";

import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaBell, FaBars } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

interface Book {
  id: number;
  title: string;
  genre: string;
  cover: string;
  borrowStatus: string;
  returnDate: string;
  borrowedDate: string;
}

const books: Book[] = [
  { id: 1, title: '', genre: 'Sci-fi', cover: "/lone wolf.png", borrowStatus: 'Returned', returnDate: '2024-10-10', borrowedDate: '2024-09-15' },
  { id: 2, title: '', genre: 'Fantasy', cover: "/Robin lee.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-01' },
  { id: 3, title: '', genre: 'Romance', cover: "/Dont Look.png", borrowStatus: 'Returned', returnDate: '2024-09-30', borrowedDate: '2024-09-10' },
  { id: 4, title: '', genre: 'Drama', cover: "/Tigers heart.jpg", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-18' },
  { id: 5, title: '', genre: 'Business', cover: "/Norse Myth.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-15' },
  { id: 6, title: '', genre: 'Education', cover: "/spring book.jpg", borrowStatus: 'Borrowed', returnDate: '2024-10-24', borrowedDate: '2024-08-04' },
];

const dashboardTwos: Book[] = [
  { id: 7,  title: '', genre: 'Geography', cover: "/harry potter.jpg", borrowStatus: 'Returned', returnDate: '2024-10-10', borrowedDate: '2024-09-15' },
  { id: 8,  title: '', genre: 'Romance', cover: "/Hide and seek.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-01' },
  { id: 9,  title: '', genre: 'Fantasy', cover: "/spring book.jpg", borrowStatus: 'Returned', returnDate: '2024-09-30', borrowedDate: '2024-09-10' },
  { id: 10, title: '', genre: 'Sci-fi', cover: "/lone wolf.png", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-18' },
  { id: 11, title: '', genre: 'Education', cover: "/walk in the shadow.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-15' },
  { id: 12, title: '', genre: 'Drama', cover: "/All this Time.png", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-10' },
];

const dashboardThrees: Book[] = [
  { id: 13, title: '', genre: 'Drama', cover: "/All this Time.png", borrowStatus: 'Returned', returnDate: '2024-10-10', borrowedDate: '2024-09-15' },
  { id: 14, title: '', genre: 'Romance', cover: "/Tigers heart.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-01' },
  { id: 15, title: '', genre: 'Fantasy', cover: "/walk in the shadow.jpg", borrowStatus: 'Returned', returnDate: '2024-09-30', borrowedDate: '2024-09-10' },
  { id: 16, title: '', genre: 'Sci-fi', cover: "/Robin lee.jpg", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-18' },
  { id: 17, title: '', genre: 'Education', cover: "/Dont Look.png", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-15' },
  { id: 18, title: '', genre: 'Geography', cover: "/Norse Myth.jpg", borrowStatus: 'Returned', returnDate: 'N/A', borrowedDate: '2024-10-12' },
];

export default function LibrarianShelf() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([...books, ...dashboardTwos, ...dashboardThrees]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [flippedBooks, setFlippedBooks] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const allBooks = [...books, ...dashboardTwos, ...dashboardThrees];
    const searchFilteredBooks = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(searchFilteredBooks);
  }, [searchTerm]);

  const handleFlip = (id: number) => {
    setFlippedBooks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const allBooks = [...books, ...dashboardTwos, ...dashboardThrees];
    const genreFilteredBooks = selectedGenre === 'All'
      ? allBooks
      : allBooks.filter(book => book.genre === selectedGenre);
    setFilteredBooks(genreFilteredBooks);
  }, [selectedGenre]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
      setDropdownOpen(false);
    }
  }


  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8 sm:flex-row space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-8">
        <h1 className="text-3xl font-bold text-[#0661E8]">BookaThon</h1>

         {/*full nav links for large screen */}
          
          <nav className="hidden sm:flex space-x-6">
          <Link href="/homepage" className="text-blue-500 font-semibold hover:text-blue-500">
          Library
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


         
        {/*Notifcation and Profile */}
         <div className="flex items-center space-x-2 sm:space-4 absolute top-2 pr-6 right-0 sm:absolute top-2">
          <FaBell className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer" />
          <Image 
          src="/user-avatar.jpg" 
          alt="Avatar" 
          width={20}
          height={10} 
          className="w-6 h-6 border rounded-full cursor-pointer" 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
             <Link href='/sign-in'>
             <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign In</div>
             </Link>
             <Link href='/homepage'>
             <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign Out</div>
             </Link>
            </div>
          )}
        </div>
      </header>

      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type book name or author"
            className="w-full p-4 border text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="text-sm absolute right-3 top-5 text-gray-500" />
        </div>
       
        {/*filter dropdowns */}
        <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center text-black p-2">
          <span className="text-black text-sm">Sort by:</span>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="p-2 text-sm border rounded-md cursor-pointer"
          >
            <option value="All">Genre</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Business">Business</option>
            <option value="Drama">Drama</option>
            <option value="Geography">Geography</option>
            <option value="Education">Education</option>
          </select>
          <select className="p-2 text-sm border rounded-md cursor-pointer">
            <option value="All">Borrowal Status</option>
          </select>
          <select className="p-2 text-sm border rounded-md cursor-pointer">
            <option value="All">Return Date</option>
          </select>
          <select className="p-2 text-sm border rounded-md cursor-pointer">
            <option value="All">Date Borrowed</option>
          </select>
        </div>
      </div>

      
      {/*All Rentals*/ }
      <div className="flex justify-between items-center p-6 text-black">
        <h1 className="font-bold text-xl">All</h1>
      </div>


      {/* Book Collection */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className={`relative p-4 rounded-md hover:shadow-lg cursor-pointer flip-container ${
              flippedBooks[book.id] ? "flipped" : ""
            }`}
            onClick={() => handleFlip(book.id)}
          >
            {/* Flip Front - Book Cover */}
            <div className="front">
              <Image
                src={book.cover}
                alt={book.title}
                width={192}
                height={300}
                className="rounded-md w-full h-auto"
              />
            </div>

            {/* Flip Back - Book Details */}
            <div className="back text-black absolute inset-0 flex flex-col justify-center items-center bg-white p-4 rounded-md shadow-lg">
              <h2 className="font-semibold text-center text-sm sm:text-base">{book.title}</h2>
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Borrowed on: {book.borrowedDate}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Return by: {book.returnDate}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Status: {book.borrowStatus}
              </p>
            </div>
          </div>
        ))}
    </div>
    </div>
  );
}
