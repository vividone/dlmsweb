"use client";

import Image from "next/image";
import { FaBell, FaSearch, FaFilter } from "react-icons/fa"
import { useState, useEffect } from 'react';

//book type definition

interface Book {
  id: number,
  title: string,
  category: string,
  cover: string,
}

const books = [
  { id: 1, title: "Lone Wolf Adventure", category: "Adventure", cover: "/lone wolf.png" },
  { id: 2, title: "Hide and Seek", category: "Mystery", cover: "/Hide and seek.jpg" },
  { id: 3, title: "Don't Look Back", category: "Thriller", cover: "/Dont Look.png" },
  { id: 4, title: "Spring Book", category: "Romance", cover: "/spring book.jpg" },
  { id: 5, title: "Harry Potter", category: "Fantasy", cover: "/harry potter.jpg" },
  { id: 6, title: "A Promise Kept", category: "Drama", cover: "/Robin lee.jpg" },
];


export default function Home() {
   // state for search input and filtered books
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
   const [selectedCategory, setSelectedCategory] = useState<string>('All');
 
   // Handle search and filtering
   useEffect(() => {
     const filtered = books.filter((book) => {
       const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
       const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
       return matchesSearch && matchesCategory;
     });
     setFilteredBooks(filtered);
   }, [searchTerm, selectedCategory]);

 
  return (
    <div className="w-[1,512px] h-[85px] relative [-1px] border pt-[16px] pr-[36px] pb-[16px] pl-[36px]">
        <div className="w-[241px] h-[53px]">
              <h1 className="font-sans text-[32px] font-bold leading-[52.79px]">
                BookaThon 
              </h1>
        </div>
        <div className="w-[1,062px] h-[53px] flex justify-between relative bottom-[35px] font-sans left-[320px]">
            <div className="w-[238px] h-[25px]">
              <div className="w-[67px] h-[25px]">
             <p className="text-[#0661E8] cursor-pointer font-semibold font-sans text-[14px] leading-[25.14px]">
              Library
             </p>
             <div className="w-[83px] h-[25px] cursor-pointer font-sans relative bottom-[25px] left-[100px]">
             <span className="text-[14px] font-semibold leading-[25.14px] w-[400px]">
               My Shelf 
             </span>
             </div>

            <div className="w-[17.88px] h-[21.81px] relative bottom-[48px] left-[900px]">
             <FaBell className='text-xl text-gray-700 cursor-pointer hover:text-blue-500'>
              </FaBell>  
              <img 
               src='/user-avatar.jpg'
               alt="Avatar"
               className="rounded-full cursor-pointer relative left-[50px] w-[64px] h-[20px] bottom-[19px]"
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
    <div className="mt-6 flex gap-4">
        {['All', 'Adventure', 'Drama', 'Thriller', 'Romance', 'Fantasy', 'Business'].map((category) => (
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

      {/* Book List */}
      <div className="flex gap-8 mt-8">
        {filteredBooks.map((book) => (
          <div key={book.id} className="p-4 rounded-md">
            <Image
              src={book.cover}
              alt={book.title}
              width={192}
              height={300}
              className="rounded-md cursor-pointer"
            />
            <h2 className="mt-4 text-sm font-semibold">{book.title}</h2>
          </div>
        ))}
      </div>

  


        </div>
      </div>
      </div>
           
  );
}
