"use client";


import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useState } from 'react';
import Header from "@/components/header/header";

// Book details component
export default function BorrowingConfirmation(){ 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

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
    }

  return (
    <div className="container mx-auto p-4">
      {/* Header section */}

      <Header />

      {/* Book Details */}
      <div className="flex flex-col items-center p-8">
      <Link href={'/account'}>
          <FaArrowLeft className="text-lg  absolute sm:absolute left-2 absolute md:absolute left-16 text-gray-800 cursor-pointer hover:text-blue-500" />
        </Link>

        {/* Success Message */}
        {success && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-lg flex items-center gap-2 p-4 bg-green-100 rounded-md mb-6">
            <span className="text-green-600 text-3xl">&#10003;</span> {/* Checkmark */}
            <div>
              <h2 className="font-sans text-xl font-semibold">Request Sent Successfully</h2>
              <p className="text-sm text-black">
                Your request for “<strong>{token}</strong>” has been sent successfully. Present the borrow
                token to the librarian to get your book.
              </p>
            </div>
          </div>
        )}

        {/*form submission */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-4 mt-28 items-center">
          <label htmlFor="token" className="text-sm font-semibold text-black">
            Your Unique Borrow Token
          </label>
          <input
            type="text"
            id="token"
            value={token}
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
          <Link href="/homepage" className="w-80 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
