"use client";


import { FaBell, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

// Book details component
export default function BorrowingConfirmation(){ 
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  

  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  }


  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevents page to refresh.
    if (token.trim() === "") {
      setError("Please enter a valid token");
      setSuccess(false);
      return;
    }

    setError(null);
    setSuccess(true); // show success message
    setToken("");
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div className="container mx-auto p-4 text-center">
      {/* Header section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#0061E8]">BookaThon</h1>
        <div className="flex items-center space-x-4 ml-auto">
          <Link href="/homepage" className="text-gray-700 text-[#0061E8] md:relative right-[640px] font-semibold hover:text-blue-500">Library</Link>
          <Link href="/dashboard" className="text-gray-700 md:relative right-[600px] font-semibold hover:text-blue-500">My Shelf</Link>
          <FaBell className="text-lg text-gray-600 cursor-pointer hover:text-blue-500" />
          <Image src="/user-avatar.jpg" alt="Avatar" width={40} height={20} className="w-8 h-8 border rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)} />
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <Link href="/sign-in">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign In</div>
              </Link>
              <Link href="/signout">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign Out</div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Book Details */}
      <div className="flex flex-col items-center p-8">
      <Link href={'/borrowing-page'}>
          <FaArrowLeft className="text-lg absolute left-32 text-gray-600 cursor-pointer hover:text-blue-500" />
        </Link>
        {/* Success Message */}
        {success && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-lg flex items-center gap-2 p-4 bg-green-100 rounded-md mb-6">
            <span className="text-green-600 text-3xl">&#10003;</span> {/* Checkmark */}
            <div>
              <h2 className="font-sans text-xl font-semibold">Request Sent Successfully</h2>
              <p className="text-sm">
                Your request for “<strong>{token}</strong>” has been sent successfully. Present the borrow
                token to the librarian to get your book.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-4 mt-28 items-center">
          <label htmlFor="token" className="text-sm relative right-40 font-semibold">
            Your Unique Borrow Token
          </label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="APEA43267"
            className="w-full h-12 border rounded-md p-4 focus:ring-2 focus:ring-blue-400"
            aria-required="true"
          />
          {error && <p className="text-red-500">{error}</p>}
        </form>

        {/* Back to Homepage Button */}
        <div className="w-full max-w-lg flex justify-center mt-10">
          <Link href="/homepage" className="w-80 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
