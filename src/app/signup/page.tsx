"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignUp() {
    const[fullname, setFullname] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState<string | null> (null);
    const[showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

         // Basic form validation
         if(!email || !password) {
            setError("Both email and password are required.")
        }

        if(!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }       
}

    // Email validation function
    const validateEmail = (email: string) => {
        const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


return(
    <div>
        <div className="w-[241px] h-[53px] absolute top-[108px] left-[476px]">
        <h1 className="w-[800px] text-[42px] leading-[52.79px] font-sans font-bold text-[#0661E8]">
            BookaThon 
        </h1>
        </div>

        <div className="w-[255px] h-[40px] top-[245px] left-[476px] absolute">
        <h1 className="font-sans font-semibold w-[400px] text-[22px] leading-[40.22px]">
            Hi, there!
        </h1>
        </div>

        <div className="w-[445px] h-[25px] top-[304px] left-[482px] absolute">
        <p className="font-sans w-[300px] text-[14px] leading-[25.14px] text-[#000000]">
            Ready to join a family of leaders, Signup now
            </p>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="w-[560px] h-[104px] relative top-[359px] left-[476px] gap-[18px]">
            <label className="font-sans w-[560px] h-[20px] text-[14px] leading-[20.11px] font-semibold">
               Fullname               
            </label>
              <input 
              type="name" 
              value={fullname}
              className="w-[560px] h-[66px] rounded-md border p-8"
              placeholder="Input your full name"
              onChange={(e) => setFullname(e.target.value)}
              aria-required='true'
              />
            </div>

            <div className="w-[560px] h-[104px] relative top-[359px] left-[476px] gap-[18px]">
            <label className="font-sans w-[560px] h-[20px] text-[14px] leading-[20.11px] font-semibold">
               Email Address               
            </label>
              <input 
              type="email" 
              value={email}
              className="w-[560px] h-[66px] rounded-md border p-8"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              aria-required='true'
              />
            </div>

            <div className="w-[560px] h-[104px] relative top-[359px] left-[476px]">
            <label className="font-sans font-semibold w-[560px] h-[20px] text-[14px] leading-[20.11px]">
                Password 
               </label>
            <input 
            type={showPassword ?  "text":"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
            className="w-[560px] h-[66px] rounded-md border p-8 "
            aria-required='true'
            />
            <span className="font-sans font-semibold text-[14px]">
                Password must include an Uppercase, a Lowercase, a Special character
            </span>
             <div
              className="absolute right-5 top-[50%] transform -translate-y-[50%] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash size={20} className="text-gray-600" />
              ) : (
                <FaEye size={20} className="text-gray-600" />
              )}
            </div>

            </div>

            <div className="w-[480px] h-[97px] relative top-[395px] flex justify-center left-[514px] gap-9px">
            <button type='submit'
            className="w-[480px] h-[58px] rounded-md pt-[14px] pr-[10px] pb-[14px] pl-[10px] bg-[#0661E8] hover:bg-blue-600 text-white focus:outline-none font-sans"
            aria-label="Signup"
            >
                Submit
            </button>
            </div>
        </form>
        <div className="font-sans w-[480px] h-[20px] font-sans flex items-center justify-center relative top-[370px] left-[480px]">
        <span>
            Already have an account?  
            <a href="/sign-in"
            className="text-sm text-[#0661E8] p-2 hover:text-blue-700">
              Login 
            </a> 
          </span>
        </div>
    </div>
)
}
