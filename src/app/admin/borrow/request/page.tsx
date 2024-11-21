"use client";

import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaFilter, FaBell, FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import {
  useRequestBooks,
} from "@/context/bookRequestsProvider";
import AdminHeader from "@/components/header/adminHeader";

// Book type definition
interface Book {
  id: number;
  title: string;
  category: string;
  cover: string;
  author: string;
}

// const booksTwo: Book[] = [
//   {
//     id: 1,
//     title: "Lone Wolf Adventure",
//     category: "Sci-fi",
//     author: "Emerngard Nausicaa",
//     cover: "/lone wolf.png",
//   },
//   {
//     id: 2,
//     title: "Hide and Seek",
//     category: "Fantasy",
//     author: "Olivia Wison",
//     cover: "/Hide and seek.jpg",
//   },
//   {
//     id: 3,
//     title: "Dont Look Back",
//     category: "Drama",
//     author: "Isaac Nelson",
//     cover: "/Dont Look.png",
//   },
//   {
//     id: 4,
//     title: "Spring Book",
//     category: "Romance",
//     author: "Deena Roberts",
//     cover: "/spring book.jpg",
//   },
//   {
//     id: 5,
//     title: "Harry Potter",
//     category: "Business",
//     author: "Isaac Nelson",
//     cover: "/harry potter.jpg",
//   },
//   {
//     id: 6,
//     title: "A Promise Kept",
//     category: "Fantasy",
//     author: "Robert Lee Hatcher",
//     cover: "/Robin lee.jpg",
//   },
//   {
//     id: 7,
//     title: "Dont Look Back",
//     category: "Drama",
//     author: "Isaac Nelson",
//     cover: "/Dont Look.png",
//   },
//   {
//     id: 8,
//     title: "Hide and Seek",
//     category: "Fantasy",
//     author: "Olivia Wison",
//     cover: "/Hide and seek.jpg",
//   },
//   {
//     id: 9,
//     title: "Harry Potter",
//     category: "Business",
//     author: "Isaac Nelson",
//     cover: "/harry potter.jpg",
//   },
//   {
//     id: 10,
//     title: "A Promise Kept",
//     category: "Fantasy",
//     author: "Robert Lee Hatcher",
//     cover: "/Robin lee.jpg",
//   },
//   {
//     id: 11,
//     title: "Lone Wolf Adventure",
//     category: "Sci-fi",
//     author: "Emerngard Nausica",
//     cover: "/lone wolf.png",
//   },
//   {
//     id: 12,
//     title: "Spring Book",
//     category: "Romance",
//     author: "Deena Roberts",
//     cover: "/spring book.jpg",
//   },
// ];

export default function BorrowedBooks() {
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

  const booksFromContext = useRequestBooks();
  console.log(booksFromContext)
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
  }, [booksFromContext, searchTerm, selectedCategory]);

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
        <AdminHeader />

        {/* Find a Book */}
        <div className="mb-6 ml-6 text-black">
          <p className="text-xl font-semibold">Books Requested</p>
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
