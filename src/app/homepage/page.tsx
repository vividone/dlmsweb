"use client";

import Image from "next/image";
import Link from 'next/link';
import { FaBell, FaSearch, FaFilter } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';



// Book type definition
interface Book {
  id: number;
  title: string;
  category: string;
  cover: string;
  author: string;
}


const books: Book[] = [
  { id: 1, title: "Lone Wolf Adventure", category: "Sci-fi", author: 'Emerngard Nausicaa', cover: "/lone wolf.png" },
  { id: 2, title: "Hide and Seek", category: "Fantasy", author: 'Olivia Wison', cover: "/Hide and seek.jpg" },
  { id: 3, title: "Dont Look Back", category: "Drama", author: 'Isaac Nelson', cover: "/Dont Look.png" },
  { id: 4, title: "Spring Book", category: "Romance", author: 'Deena Roberts', cover: "/spring book.jpg" },
  { id: 5, title: "Harry Potter", category: "Business", author: 'Isaac Nelson', cover: "/harry potter.jpg" },
  { id: 6, title: "A Promise Kept", category: "Fantasy", author: 'Robert Lee Hatcher', cover: "/Robin lee.jpg" },
];

const booksTwo: Book[] = [
  { id: 7, title: "Dont Look Back", category: "Drama", author: 'Isaac Nelson', cover: "/Dont Look.png" },
  { id: 8, title: "Hide and Seek", category: "Fantasy", author: 'Olivia Wison', cover: "/Hide and seek.jpg" },
  { id: 9, title: "Harry Potter", category: "Business", author: 'Isaac Nelson', cover: "/harry potter.jpg" },
  { id: 10, title: "A Promise Kept", category: "Fantasy", author: 'Robert Lee Hatcher', cover: "/Robin lee.jpg" },
  { id: 11, title: "Lone Wolf Adventure", category: "Sci-fi", author: 'Emerngard Nausica', cover: "/lone wolf.png" },
  { id: 12, title: "Spring Book", category: "Romance", author: 'Deena Roberts', cover: "/spring book.jpg" },
];

export default function Home() {
  // State for search input and filtered books
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  // Handle search and filtering
  useEffect(() => {
    const filterData = (bookList: Book[]) =>
      bookList.filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });

    const combinedFilteredBooks = [...filterData(books), ...filterData(booksTwo)];
    setFilteredBooks(combinedFilteredBooks);
  }, [searchTerm, selectedCategory]);


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex justify-between items-center sm:flex-row  mb-8 mb-6 space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-8">
        <h1 className="text-3xl font-bold text-[#0661E8]">BookaThon</h1>
          <nav className="sm:flex space-x-2">
          <Link href="/homepage" className="text-[#0661E8] text-base font-semibold text-sm sm:text-base hover:text-blue-500">
            Library
          </Link>
          <Link href="/dashboard" className="font-semibold text-base text-sm sm:text-base hover:text-blue-500">
            My Shelf
          </Link>
          </nav>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
          <FaBell className='text-sm text-gray-700 cursor-pointer hover:text-blue-500' />
          <Image  
            src='/user-avatar.jpg'
            alt="Avatar"
            width={20}
            height={10}
            className="w-6 h-6 border rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
         />
         {dropdownOpen && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
            <Link href='/sign-in'>
              <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                Sign In 
              </div>
            </Link>
            <Link href="/signout">
                  <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign Out</div>
            </Link>
          </div>
         )}
         </div>
      </header>

      {/* Find a Book */}
      <div className="mb-6">
        <p className="text-xl font-semibold">Find a Book</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="relative flex-grow sm:w-auto">
          <input 
            type="text" 
            value={searchTerm}
            className="border p-3 sm:p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"      
            placeholder="Type book name or author"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" 
          />
        </div>
        <button 
          onClick={() => setSelectedCategory('All')}
          className="flex items-center px-8 py-2 ml-4 bg-[#0661E8] text-white rounded-md hover:bg-blue-600"
        >
          <FaFilter className="mr-2 text-lg opacity-40" /> {/* Filter Icon */}
          Filter
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex overflow-x-auto sm:overflow-visible gap-2 sm:justify-between mb-6">
        {['All', 'Sci-fi', 'Fantasy', 'Romance', 'Drama', 'Business', 'Education', 'Geography'].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 whitespace-nowrap rounded-md text-sm  ${
              selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-blue-200 text-black'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Book Collection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {filteredBooks.map((book) => (
          <Link key={book.id} href={`/book/${book.id}`}>
            <div className="p-4 rounded-md hover:shadow-lg transition-shadow cursor-pointer">
              <Image
                src={book.cover}
                alt={book.title}
                width={192}
                height={300}
                className="rounded-md w-full h-auto"
              />
              <h2 className="mt-2 font-semibold text-lg">{book.title}</h2>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
