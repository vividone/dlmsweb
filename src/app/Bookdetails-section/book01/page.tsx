"use client";

import { FaBell, FaArrowLeft } from "react-icons/fa"
import Link from "next/link"; // use for routing

export default function BookDetailsOne() {
  return (
    <div className="max-w-[1512px] h-[85px] mx-auto border sm:p-6 md:p-8 lg:p-6">
        <div className="w-[241px] h-[53px]">
              <h1 className="font-sans text-[32px] font-bold leading-[52.79px] md:text-3xl font-bold">
                BookaThon 
              </h1>
        </div>
        <div className="w-[1062px] h-[53px] flex flex-col md:flex-row justify-between relative bottom-[35px] font-sans left-[320px]">
            <div className="flex-space-x-2">
              <div className="w-[67px] h-[25px] cursor-pointer">
             <Link href='/homepage' className="font-semibold  text-[#0661E8] font-sans text-[14px] leading-[25.14px]">
              Library
             </Link>
             <div className="w-[83px] h-[25px] font-sans cursor-pointer relative bottom-[25px] left-[100px]">
             <Link href='/dashboard' className="text-[14px] font-semibold leading-[25.14px] w-[400px] hover:text-blue-500">
               My Shelf 
             </Link>
             </div>

            <div className="w-[17.88px] h-[21.81px] relative bottom-[48px] left-[900px]">
             <FaBell className='text-xl text-gray-700 cursor-pointer hover:text-blue-500'>
              </FaBell>  
              <img 
               src='/user-avatar.jpg'
               alt="Avatar"
               className="rounded-full cursor-pointer relative left-[50px] w-26 h-6 bottom-[23px]"
               />
            </div>
          
          {/* Back arow to redirect user to homepage */}
            <div className="flex items-center space-x-2 relative top-[80px] right-[300px]">
            <Link href="/homepage" passHref>
              <FaArrowLeft className="text-md text-gray-700 cursor-pointer hover:text-blue-500" />
            </Link>
          </div>



            <div className="flex w-[412px] relative top-[121px] right-[300px]">
                <img src="/Hide and seek.jpg"
                alt="Hide and seek" 
                className="cursor-pointer" 
                 />
                 <div className="w-[335px] h-[115px]">
                 <h2 className="font-sans p-8 font-semibold">
                      AUTHOR:   Olivia Wison
                 </h2>

                 <span className="font-sans p-8 font-semibold">STATUS:  Available </span>
            

            <div className="w-[648px] h-[448px]">
              <h2 className="p-8 font-semibold">SYNOPSIS</h2>
              <p className="font-sans p-8">
              Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.Follow the story of Henry Smith, a scientist on a research in a small native American village where canine adventures awaits him. With a research assistant by his side to help him navigate being a scientist by day and a werewolf by night.
              </p>
            </div>

            </div>
            </div>

            <div className="flex w-[480px] justify-center h-[58px] relative left-[213px] p-8">
            <button type='submit'
            className="w-[480px] h-[58px] rounded-md pt-[14px] pr-[10px] pb-[14px] pl-[10px] bg-[#0661E8] hover:bg-blue-600 text-white focus:outline-none font-sans"
            aria-label="Borrow this book"
            >
                <a href="/borrowing-page1">
                BORROW THIS BOOK 
                </a>
            </button>
        </div>

             </div>
            </div>
        </div>
</div>

  );
}