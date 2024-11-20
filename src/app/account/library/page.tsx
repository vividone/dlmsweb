"use client";

import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaFilter, FaBell, FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useBooks } from "@/context/bookProvider";

// Book type definition
interface Book {
  id: number;
  title: string;
  category: string;
  cover: string;
  author: string;
}


const booksTwo: Book[] = [
  {
    id: 1,
    title: "Lone Wolf Adventure",
    category: "Sci-fi",
    author: "Emerngard Nausicaa",
    cover: "/lone wolf.png",
  },
  {
    id: 2,
    title: "Hide and Seek",
    category: "Fantasy",
    author: "Olivia Wison",
    cover: "/Hide and seek.jpg",
  },
  {
    id: 3,
    title: "Dont Look Back",
    category: "Drama",
    author: "Isaac Nelson",
    cover: "/Dont Look.png",
  },
  {
    id: 4,
    title: "Spring Book",
    category: "Romance",
    author: "Deena Roberts",
    cover: "/spring book.jpg",
  },
  {
    id: 5,
    title: "Harry Potter",
    category: "Business",
    author: "Isaac Nelson",
    cover: "/harry potter.jpg",
  },
  {
    id: 6,
    title: "A Promise Kept",
    category: "Fantasy",
    author: "Robert Lee Hatcher",
    cover: "/Robin lee.jpg",
  },
  {
    id: 7,
    title: "Dont Look Back",
    category: "Drama",
    author: "Isaac Nelson",
    cover: "/Dont Look.png",
  },
  {
    id: 8,
    title: "Hide and Seek",
    category: "Fantasy",
    author: "Olivia Wison",
    cover: "/Hide and seek.jpg",
  },
  {
    id: 9,
    title: "Harry Potter",
    category: "Business",
    author: "Isaac Nelson",
    cover: "/harry potter.jpg",
  },
  {
    id: 10,
    title: "A Promise Kept",
    category: "Fantasy",
    author: "Robert Lee Hatcher",
    cover: "/Robin lee.jpg",
  },
  {
    id: 11,
    title: "Lone Wolf Adventure",
    category: "Sci-fi",
    author: "Emerngard Nausica",
    cover: "/lone wolf.png",
  },
  {
    id: 12,
    title: "Spring Book",
    category: "Romance",
    author: "Deena Roberts",
    cover: "/spring book.jpg",
  },
];

export default function Home() {
  // State for search input and filtered books
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const booksFromContext = useBooks();



  // Handle search and filtering

  useEffect(() => {
    const filterData = (bookList: Book[]) =>
      bookList.filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });

    const filteredBooks =
      booksFromContext.length > 0
        ? filterData(booksFromContext)
        : filterData(booksTwo);

    setFilteredBooks(filteredBooks);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    // close dropdown if clicked
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
    // close menu if clicked outside
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-x-hidden">
      {/* Header */}
      <header className="flex justify-between items-center sm:flex-row mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold text-[#0661E8]">BookaThon</h1>

          {/* full nav links for larger screen */}
          <nav className="hidden sm:flex space-x-6">
            <Link href="/account/library" className="text-blue-500 text-base font-semibold hover:text-blue-500">
            Library
            </Link>
            <Link href="/account/shelf/borrowed" className="text-blue-500 text-base font-semibold hover:text-blue-500">
            Borrowed
            </Link>
            <Link href="/account/shelf/returned" className="text-blue-500 text-base font-semibold hover:text-blue-500">
            Returned
            </Link>
            <Link href="/account/shelf/borrowed" className="text-blue-500 text-base font-semibold hover:text-blue-500">
            Overdue
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
          <Link href="/account/library" className="text-blue-500 text-base font-semibold hover:text-blue-500">
      Library
      </Link>
      <Link href="/account/shelf/borrowed" className="text-blue-500 text-base font-semibold hover:text-blue-500">
      Borrowed
      </Link>
      <Link href="/account/shelf/returned" className="text-blue-500 text-base font-semibold hover:text-blue-500">
      Returned
      </Link>
      <Link href="/account/shelf/borrowed" className="text-blue-500 text-base font-semibold hover:text-blue-500">
      Overdue
      </Link>
      </div>
    )}
    </div>
    </div>


          {/*Notification and Profile */}
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
                    transform: menuOpen ? "scale(1)" : "scale(0.95)",
                  }}
                >
                  <Link href="/account/home">
                    <div className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                      Library
                    </div>
                  </Link>
                  <Link href="/account">
                    <div className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                      My Shelf
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {/*Notification and Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4 absolute top-2 pr-6 right-0 sm:absolute top-2">
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
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 sm:right-0 text-sm bg-white border rounded-md shadow-lg"
            >
              <Link href="/">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Sign Out
                </div>
              </Link>
            </div>
          )}
        </div>
  </header>

      {/* Find a Book */}
      <div className="mb-6 ml-6 text-black">
        <p className="text-xl font-semibold">Find a Book</p>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center mb-6 space-x-2 sm:space-x-4 md:space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            className="border text-sm text-black p-2 sm:p-3 md:p-4 w-full sm:w-3/4 md:w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Type book name or author"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute text-sm right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
        </div>
        <button onClick={() => setSelectedCategory("All")}></button>

        {/* filter button*/}
        <button
          onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
          className="flex items-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-2 ml-2 text-white bg-blue-700 rounded-md hover:bg-blue-600"
        >
          <FaFilter className="mr-2 text-sm opacity-40" />
          Filter
        </button>
      </div>

      {/* Filter Dropdown */}
      {filterDropdownOpen && (
        <div
          ref={filterRef}
          className="absolute mt-2 w-48 bg-white border rounded-md text-black shadow-lg z-10"
        >
          {[
            "All",
            "Sci-fi",
            "Fantasy",
            "Romance",
            "Drama",
            "Business",
            "Education",
            "Geography",
          ].map((category) => (
            <button
              key={category}
              className={`w-full text-left px-4 py-2 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setFilterDropdownOpen(false);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Category Filter */}
      <div className="flex overflow-x-auto flex lg:overflow-x-auto flex sm:overflow-visible gap-20 font-semibold sm:justify-between mb-6 animate-scroll">
        {[
          "All",
          "Sci-fi",
          "Fantasy",
          "Romance",
          "Drama",
          "Business",
          "Education",
          "Geography",
        ].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 whitespace-nowrap lg:whitespace-nowrap rounded-md text-sm  ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-blue-200 text-black"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Book Collection */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-black">
        {filteredBooks.map((book) => (
          <Link key={book.id} href={`/account/library/book/${book.id}`}>
            <div className="p-4 rounded-md hover:shadow-lg transition-shadow cursor-pointer">
              <Image
                src={"/" + book.title}
                alt={book.title}
                width={192}
                height={300}
                className="rounded-md w-full h-auto"
              />
              <h2 className="mt-2 font-semibold text-black text-sm">
                {book.title}
              </h2>
              <p className="text-sm text-black">{book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
