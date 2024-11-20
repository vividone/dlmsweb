"use client";

import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { FaBell, FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLocalStorage } from "@/helpers/useLocalStorage";

// Book details component
export default function BorrowingConfirmation() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [borrow, ] = useLocalStorage("borrow", {})

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents page to refresh.
    if (token.trim() === "") {
      setError("Please enter a valid token");
      setSuccess(false);
      return;
    }

    setError(null);
    setSuccess(true); // show success message
    setToken("");
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header section */}
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

      {/* Book Details */}
      <div className="flex flex-col items-center p-8">
        <Link href={"/account"}>
          <FaArrowLeft className="text-lg  absolute sm:absolute left-2 absolute md:absolute left-16 text-gray-800 cursor-pointer hover:text-blue-500" />
        </Link>

        {/* Success Message */}
        {success && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-lg flex items-center gap-2 p-4 bg-green-100 rounded-md mb-6">
            <span className="text-green-600 text-3xl">&#10003;</span>{" "}
            {/* Checkmark */}
            <div>
              <h2 className="font-sans text-xl font-semibold">
                Request Sent Successfully
              </h2>
              <p className="text-sm text-black">
                Your request for “<strong>{token}</strong>” has been sent
                successfully. Present the borrow token to the librarian to get
                your book.
              </p>
            </div>
          </div>
        )}

        {/*form submission */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg flex flex-col gap-4 mt-28 items-center"
        >
          <label htmlFor="token" className="text-sm font-semibold text-black">
            Your Unique Borrow Token
          </label>
          <input
            type="text"
            id="token"
            value={borrow.collectionToken}
            onChange={(e) => setToken(e.target.value)}
            placeholder="APEA43267"
            className="w-full h-12 text-black border rounded-md p-4 focus:ring-2 focus:ring-blue-400"
            aria-required="true"
          />
          {error && <p className="text-red-500">{error}</p>}
        </form>

        {/* Back to Homepage Button */}
        <div className="w-full max-w-lg flex flex-col gap-4 items-center justify-center mt-10">
          <button
            className="w-80 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <Link
            href="/homepage"
            className="w-80 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
