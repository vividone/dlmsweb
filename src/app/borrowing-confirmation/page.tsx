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
       <div className="w-[1,512px] h-[85px] relative [-1px] border pt-[16px] pr-[36px] pb-[16px] pl-[36px]">
              <div className="w-[241px] h-[53px]">
              <h1 className="font-sans text-[32px] font-bold leading-[52.79px]">
                BookaThon 
              </h1>
        </div>
        <div className="w-[1,062px] h-[53px] flex justify-between relative bottom-[35px] font-sans left-[320px]">
            <div className="w-[238px] h-[25px]">
              <div className="w-[67px] h-[25px] cursor-pointer">
             <p className="text-[#0661E8] font-semibold font-sans text-[14px] leading-[25.14px]">
              Library
             </p>
             <div className="w-[83px] h-[25px] font-sans cursor-pointer relative bottom-[25px] left-[100px]">
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
  
  {/* Success Message */}
  {success && (
        <div className="w-full max-w-lg flex items-center gap-2 p-4 bg-green-100 rounded-md mb-6">
          <span className="text-green-600 text-3xl">&#10003;</span> {/* Checkmark */}
          <div>
            <h2 className="font-sans text-xl font-semibold">Request Sent Successfully</h2>
            <p className="text-sm">
              Your request for "Lone Wolf Adventure" has been sent successfully. Present the borrow
              token to the librarian to get your book.
            </p>
          </div>
        </div>
      )}

      {/* Token Input and Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-4">
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
      <div className="w-full max-w-lg flex justify-center mt-8">
        <a
          href="/homepage"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center"
        >
          Back to Homepage
        </a>
        </div>
        </div>
  );
}