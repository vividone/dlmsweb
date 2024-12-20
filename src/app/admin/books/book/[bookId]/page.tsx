"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaBell, FaBars } from "react-icons/fa";
import Link from "next/link";
import { use } from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useCookies } from "@/helpers/useCookies";
import { Book } from "../../page";


// Book details component
export default function BookId({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const router = useRouter();
  const { bookId } = use(params);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [book, setBook] = useState<Book>();
  const { getCookies } = useCookies();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://dlms-backend.onrender.com/books/${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${getCookies().access_token}`,
            },
          },
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

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

  if (!book) {
    return <p>Book not found.</p>;
  }

  const handleBorrowClick = () => {
    router.push(`/account/shelf/borrow/request/${book?.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <header className="flex justify-between items-center sm:flex-row mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold text-[#0661E8]">BookaThon</h1>

          {/* full nav links for larger screen */}
          <nav className="hidden sm:flex space-x-6">
            <Link
              href="/account/library"
              className="text-blue-500 text-base font-semibold hover:text-blue-500"
            >
              Library
            </Link>
            <Link
              href="/account/shelf/borrow"
              className="text-blue-500 text-base font-semibold hover:text-blue-500"
            >
              Borrowed
            </Link>
            <Link
              href="/account/shelf/returned"
              className="text-blue-500 text-base font-semibold hover:text-blue-500"
            >
              Returned
            </Link>
            <Link
              href="/account/shelf/overdue"
              className="text-blue-500 text-base font-semibold hover:text-blue-500"
            >
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
                    transform: menuOpen ? "scale(1)" : "scale(0.95)",
                  }}
                >
                  <Link
                    href="/account/library"
                    className="text-blue-500 text-base font-semibold hover:text-blue-500"
                  >
                    Library
                  </Link>
                  <Link
                    href="/account/shelf/overdue"
                    className="text-blue-500 text-base font-semibold hover:text-blue-500"
                  >
                    Borrowed
                  </Link>
                  <Link
                    href="/account/shelf/returned"
                    className="text-blue-500 text-base font-semibold hover:text-blue-500"
                  >
                    Returned
                  </Link>
                  <Link
                    href="/account/shelf/overdue"
                    className="text-blue-500 text-base font-semibold hover:text-blue-500"
                  >
                    Overdue
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Book Details */}
      <div className="relative flex text-black flex-col sm:flex-row sm:items-start sm:space-x-6 mt-14">
        {/*Arrow left */}
        <Link href={"/account/library"}>
          <FaArrowLeft className="absolute top-0 left-0 ml-2 mt-2 text-md cursor-pointer hover:text-blue-500" />
        </Link>

        {/*Book cover and Content */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6 mt-14">
          <Image
src={
  book.coverimage
    ? "/" + book.coverimage
    : "/book-cover-generic.jpg"
}            alt={book.title}
            width={270}
            height={50}
            className="mt-0 rounded-md"
          />

          <div className="mt-6 sm:mt-0 sm:w-1/2 w-full text-center sm:text-left">
            <h2 className="text-gray-800 text-lg mb-4 sm:mb-2">
              <strong>AUTHOR:</strong> {book.author}
            </h2>
            <h2 className="text-gray-800 text-lg mb-4 sm:mb-2">
              <strong>STATUS:</strong> {book.availability === true ?  'Available': 'Not Available'}
            </h2>
            <h2 className="text-gray-800 text-md">
              <strong> SYNOPSIS</strong> <br /> <br />
              {book.description}
            </h2>
          </div>
        </div>
      </div>
      {/* Borrow Button */}
      <div className="flex justify-left p-4 mt-8 md:relative bottom-8">
        <button
          type="submit"
          onClick={handleBorrowClick}
          className="bg-blue-600 w-72 text-white rounded-md p-2 hover:bg-blue-700"
        >
          Borrow This Book
        </button>
      </div>
    </div>
  );
}
