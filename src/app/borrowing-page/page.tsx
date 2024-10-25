"use client"

import { FaBell } from "react-icons/fa"
import { FaSearch } from 'react-icons/fa'
import { useState } from "react"


export default function Home() {
    const[collectionDate, setConfirmationDate] = useState('') 
    const[returnDate, setReturnDate] = useState('');  
    const[error, setError] = useState<string | null>(null); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = await Response.json
        if(Response) {
            alert('Request Sent Successfully')
        }
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

            <div className="flex w-[412px] relative top-[121px] right-[300px]">
                <img src="/lone wolf.png"
                alt="lone wolf" 
                className="cursor-pointer" 
                 />
                 <div className="w-[335px] h-[115px]">
                 <h2 className="font-sans text-[20px] text-[#081E6F] p-8 font-semibold relative left-[200px]">
                      You are borrowing:
                 </h2> 
                 <h3 className="p-8 text-[20px] font-semibold relative bottom-[66px] font-sans relative left-[200px]">Lone Wolf Adventure</h3>
            
                 <form onSubmit={handleSubmit}>
           <div className="w-[560px] h-[104px] relative bottom-[59px] left-[235px] gap-[18px]">
            <label className="font-sans w-[560px] h-[20px] text-[14px] leading-[20.11px] font-semibold">
               Collection Date                
            </label>
              <input 
              type="text" 
              value={collectionDate}
              className="w-[560px] h-[66px] rounded-md border p-8"
              placeholder="DD/MM/YYYY"
              onChange={(e) => setConfirmationDate(e.target.value)}
              aria-required='true'
              />
            </div>

            <div className="w-[560px] h-[104px] relative bottom-[39px] left-[235px] gap-[18px]">
            <label className="font-sans w-[560px] h-[20px] text-[14px] leading-[20.11px] font-semibold">
               Return Date                
            </label>
              <input 
              type="text" 
              value={returnDate}
              className="w-[560px] h-[66px] rounded-md border p-8"
              placeholder="DD/MM/YYYY"
              onChange={(e) => setReturnDate(e.target.value)}
              aria-required='true'
              />
            </div>

            </form>
            </div>
            </div>
             
            <div className="flex w-[480px] justify-center h-[58px] relative left-[363px] p-8">
            <button type='submit'
            className="w-[480px] h-[58px] rounded-md pt-[14px] pr-[10px] pb-[14px] pl-[10px] bg-[#0661E8] hover:bg-blue-600 text-white focus:outline-none font-sans"
            aria-label="Borrowing confirmation"
            >
                <a href="/borrowing-confirmation">
                  Submit 
                </a>
            </button>
        </div>
    

             </div>
            </div>
        </div>
</div>

  );
}