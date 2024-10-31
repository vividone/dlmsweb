"use client";

import Image from "next/image";
import Link from 'next/link';
import { FaBell, FaSearch, FaFilter } from "react-icons/fa"
import { useState, useEffect } from 'react';

//book type definition

interface Book {
  id: number,
  title: string,
  category: string,
  cover: string,
  author: string,
}



const books = [
  { id: 1, title: "Lone Wolf Adventure", category: "Adventure", author: 'Emerngard Nausicaa', cover: "/lone wolf.png" },
  { id: 2, title: "Hide and Seek", category: "Mystery", author:'Olivia Wison', cover: "/Hide and seek.jpg" },
  { id: 3, title: "Don't Look Back", category: "Thriller", author:'Isaac Nelson', cover: "/Dont Look.png" },
  { id: 4, title: "Spring Book", category: "Romance", author:'Deena Roberts', cover: "/spring book.jpg" },
  { id: 5, title: "Harry Potter", category: "Fantasy", author:'Isaac Nelson', cover: "/harry potter.jpg" },
  { id: 6, title: "A Promise Kept", category: "Drama", author:'Robert Lee Hatcher', cover: "/Robin lee.jpg" },
];

const booksTwo = [
  { id: 1, title: "Don't Look Back", category: "Thriller", author: 'Isaac Nelson', cover: "/Dont Look.png" },
  { id: 2, title: "Hide and Seek", category: "Mystery", author:'Olivia Wison', cover: "/Hide and seek.jpg" },
  { id: 3, title: "Harry Potter", category: "Fantasy", author:'Isaac Nelson', cover: "/harry potter.jpg" },
  { id: 4, title: "A Promise Kept", category: "Drama", author:'Robert Lee Hatcher', cover: "/Robin lee.jpg" },
  { id: 5, title: "Lone Wolf Adventure", category: "Adventure", author:'Emerngard Nausica', cover: "/lone wolf.png" },
  { id: 6, title: "Spring Book", category: "Romance", author:'Deena Roberts', cover: "/spring book.jpg" },
];

export default function Home() {
   // state for search input and filtered books
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [filteredBooks, setFilteredBooks] = useState<Book[]>(books && booksTwo);
   const [selectedCategory, setSelectedCategory] = useState<string>('All');
 
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

 
  return (
    <div className="w-[1512px] h-[85px] relative [-1px] border pt-[16px] pr-[36px] pb-[16px] pl-[36px]">
        <div className="w-[241px] h-[53px]">
              <h1 className="font-sans text-[32px] font-bold leading-[52.79px]">
                BookaThon 
              </h1>
        </div>

        <div className="w-[1,062px] h-[53px] flex justify-between relative bottom-[35px] font-sans left-[320px]">
            <div className="w-[238px] h-[25px]">
              <div className="w-[67px] h-[25px]">
            {/* Library Link */}
            <Link href="/homepage" className="text-[#0661E8] cursor-pointer font-semibold text-[14px] leading-[25.14px]">
              Library
            </Link>

             <div className="w-[83px] h-[25px] cursor-pointer font-sans relative bottom-[25px] left-[100px]">
             {/*My Shelf Link */}
             <Link href="/dashboard" className="text-[14px] font-semibold leading-[25.14px] hover:text-blue-500">
             My Shelf
             </Link>
             </div>

            <div className="w-[17.88px] h-[21.81px] relative bottom-[48px] left-[900px]">
             <FaBell className='text-xl text-gray-700 cursor-pointer hover:text-blue-500'>
              </FaBell>  
              <img 
               src='/user-avatar.jpg'
               alt="Avatar"
               className="rounded-full cursor-pointer relative left-[50px] w-32 h-6 bottom-[22px]"
               />
            </div> 
                
             </div>
            </div>
        </div>

       {/* find a book */}

        <div className="w-[195px] h-[40px] top-[135px] left-[80px]">
          <p className="w-[400px] font-semibold font-sans text-[22px] leading-[40.22px]">
            Find a Book
          </p>
        </div>

      {/*Search input */}

        <div className="w-[992px] h-[66px] flex rounded-md justify-between p-8">
          <div className="relative">
            <input 
            type="text" 
            value={searchTerm}
            className="border p-6 font-sans w-[1112px] h-[66px] bottom-[25px] right-[35px] relative rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"      
            placeholder="Type book name or author"
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          
           {/* Search Icon */}
      <FaSearch 
      className="text-gray-500 w-3 h-6 relative bottom-[70px] left-[1040px] cursor-pointer" 
      />
        

        <div className="w-[172px] h-[58px] relative bottom-[110px] left-[1090px] rounded-md border pt-[14px] pr-[10px] pb-[14px] pl-[10px] hover:bg-blue-500 bg-[#0661E8] cursor-pointer">
  <button 
    type="submit"
    onClick={() => setSelectedCategory('All')}
    className="text-white font-sans text-[14px] flex items-center justify-center gap-2"
  >
    <FaFilter className="text-white text-lg opacity-40" /> {/* Filter Icon */}
    Filter
  </button>
 </div>

{/* Category Filter */}
    <div className="mt-6 flex gap-8 relative bottom-20 right-[30px]">
        {['All', 'Adventure', 'Drama', 'Thriller', 'Romance', 'Fantasy', 'Business', 'Education', 'Geography'].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-blue-200 text-black'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

       {/* Book Rows */}
       <div className="space-y-12">
        {/* First Row */}
        <div className="grid grid-cols-6 gap-8">
          {filteredBooks.slice(0, books.length).map((book) => (
            <div key={book.id} className="p-4 rounded-md">
              <Image
                src={book.cover}
                alt={book.title}
                width={192}
                height={300}
                className="rounded-md cursor-pointer"
              />
              <h2 className="mt-2 font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-6 gap-8">
          {filteredBooks.slice(books.length).map((book) => (
            <div key={book.id} className="p-4 rounded-md">
              <Image
                src={book.cover}
                alt={book.title}
                width={192}
                height={300}
                className="rounded-md cursor-pointer"
              />
              <h2 className="mt-2 font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
          ))}
        </div>

          </div>
      </div>
      </div>
    </div>
  );
}
