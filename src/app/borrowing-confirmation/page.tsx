"use client";

import { FaBell } from "react-icons/fa"
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Home() {
  const[token, setToken] = useState('');
  const[error, setError] = useState<string | null>(null);
  const[success, setSuccess] = useState(false);


  const handleSubmit = (e:React.FormEvent) => {
       e.preventDefault(); // prevent page refresh
       if(token.trim() === ""){
        setError("Please enter a valid token");
        setSuccess(false);
        return;
       }

       setError(null);
       setSuccess(true); // show success message
       setToken(""); // clear the input field;
       setTimeout(() => setSuccess(false), 3000); // hide success message after 3 seconds
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <div className="w-full max-w-4xl border bg-white p-8 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold font-sans">BookaThon</h1>
          <div className="flex items-center gap-8">
            <p className="text-blue-600 font-semibold cursor-pointer">Library</p>
            <span className="font-semibold cursor-pointer">My Shelf</span>
            <FaBell className="text-xl text-gray-700 cursor-pointer hover:text-blue-500" />
            <img
              src="/user-avatar.jpg"
              alt="Avatar"
              className="rounded-full w-10 h-10 cursor-pointer"
            />
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-2 p-4 bg-green-100 rounded-md mb-6">
            <span className="text-green-600 text-3xl">&#10003;</span> {/* Checkmark */}
            <div>
              <h1 className="font-sans text-xl font-semibold">
                Request Sent Successfully
              </h1>
              <p className="text-sm">
                Your request for “Lone Wolf Adventure” has been sent successfully.
                Present the borrow token to the librarian to get your book.
              </p>
            </div>
          </div>
        )}

        {/* Token Input */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="token" className="text-lg font-semibold">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none"
            aria-label="Submit Borrow Request"
          >
            Submit Borrow Request
          </button>
        </form>

        {/* Back to Homepage Button */}
        <div className="flex justify-center mt-8">
          <a
            href="/homepage"
            className="w-60 h-12 bg-gray-300 hover:bg-gray-400 text-center rounded-md flex items-center justify-center"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}