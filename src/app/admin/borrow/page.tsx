"use client";

import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import {
  useBorrowedBooks,
} from "@/context/borrowedBooksProvider";
import AdminHeader from "@/components/header/adminHeader";

// Book type definition
interface Book {
  id: number;
  title: string;
  category: string;
  cover: string;
  author: string;
}

export default function BorrowedBooks() {
  // State for search input and filtered books
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const booksFromContext = useBorrowedBooks();

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

    // const filteredBooks =
    //   booksFromContext.length > 0
    //     ? filterData(booksFromContext)
    //     : filterData(booksTwo);

    const filteredBooks = filterData(booksFromContext);

    setFilteredBooks(filteredBooks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto p-4 overflow-x-hidden">
      {/* Header */}
      <AdminHeader />

      {/* Find a Book */}
      <div className="mb-6 ml-6 text-black">
        <p className="text-xl font-semibold">All Borrowed Books</p>
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
          <Link key={book.id} href={`/borrow/book/${book.id}`}>
            <div className="p-4 rounded-md hover:shadow-lg transition-shadow cursor-pointer">
              <Image
                src={book.cover}
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
