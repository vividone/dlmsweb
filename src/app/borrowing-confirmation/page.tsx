"use client";

import { FaBell } from "react-icons/fa"
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Home() {
  const[token, setToken] = useState('');
  const[error, setError] = useState<string | null>(null);

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
             <p className="text-[#0661E8] font-semibold font-semibold font-sans text-[14px] leading-[25.14px]">
              Library
             </p>
             <div className="w-[83px] h-[25px] cursor-pointer font-sans relative bottom-[25px] left-[100px]">
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

            <div className="w-[378px] h-[40px]">
               <h1 className="font-sans text-[32px]">Request Sent Successfully</h1>
            </div>
                <p className="font-sans leading-[20.17px]">Your request for “Lone Wolf Adventure” has been sent successfully.
                Here’s your borrow token, present it to the Librarian to get your book</p>
             </div>
            </div>

            <div className="w-[560px] h-[112px] relative top-[347px] right-[566px]">
               <label className="">
                 Your Unique Borrow Token 
               </label>
               <input 
              type="token" 
              value={token}
              className="w-[560px] h-[66px] rounded-md border p-8"
              placeholder="APEA43267"
              onChange={(e) => (e.target.value)}
              aria-required='true'
              />
            </div>
            </div>
            <div className="w-[480px] h-[97px] relative top-[395px] flex justify-center left-[514px] gap-9px">
            <button type='submit'
            className="w-[480px] h-[58px] rounded-md pt-[14px] pr-[10px] pb-[14px] pl-[10px] bg-[#0661E8] hover:bg-blue-600 text-white focus:outline-none font-sans"
            aria-label="homepage"
            >
                <a href="/homepage">
                Back to Homepage
                </a>
            </button>
            </div>

        </div>


  );
}