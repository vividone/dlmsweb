"use client";

import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaBell, FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import AdminHeader from "@/components/header/adminHeader";
import { useBooks } from "@/context/bookProvider";
// Book Type definition

export interface Book {
  id: number;
  title: string;
  category: string;
  coverimage: string;
  author: string;
  description?: string;
  borrowStatus: string;
  returnDate: string;
  borrowedDate: string;
}

export default function Books() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const AllBooks = useBooks();

  const [filteredBooks, setFilteredBooks] = useState<Book[] | any>([
    ...AllBooks,
  ]);

  useEffect(() => {
    const allBooks = AllBooks;

    const searchFilteredBooks: any = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(searchFilteredBooks);
  }, [searchTerm, AllBooks]);

  useEffect(() => {
    const allBooks = AllBooks;
    const genreFilteredBooks: any =
      selectedGenre === "All"
        ? allBooks
        : allBooks.filter((book: any) => book.genre === selectedGenre);
    setFilteredBooks(genreFilteredBooks);
  }, [selectedGenre, AllBooks]);

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
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <AdminHeader />
      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 text-black">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type book name or author"
            className="w-full text-sm p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="text-sm absolute right-3 top-5 text-gray-500" />
        </div>

        {/*Filter dropdowns */}
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
            <option value="Fantasy">Fantasy</option>
            <option value="Drama">Drama</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
            <option value="Geography">Geography</option>
          </select>
        </div>
      </div>

      {/* All Rentals */}
      <div className="flex justify-between items-center p-6 text-black">
        <h1 className="font-bold text-xl">All</h1>
      </div>

      {/* Book Collection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredBooks.map((book: any) => (
          <Link key={book.id} href={`/admin/books/book/${book.id}`}>
            <div className="p-4 rounded-md hover:shadow-lg cursor-pointer">
              <Image
                src={
                  book.cover
                    ? "/" + book.cover
                    : book.title
                    ? "/" + book.title + ".png"
                    : "/book-cover-generic.jpg"
                }
                alt={"cover"}
                width={192}
                height={300}
                className="rounded-md w-full h-auto"
              />
              <h2 className="mt-2 font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
