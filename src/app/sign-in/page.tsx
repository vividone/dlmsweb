"use client";

import { SetStateAction, useState } from "react";
import InputField from "../../components/InputFields";


export default function SignIn() {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password)

    };

    return(
        <div className="w-full max-w-md mx-auto mt-16 p-8 bg-white shadow-md rounded-md">
        <div className="w-[241px] h-[53px] absolute top-[158px] left-[476px]">
        <h1 className="w-[800px] text-[42px] leading-[52.79px] font-sans font-bold text-[#0661E8]">
            BookaThon 
        </h1>
        </div>
          
          <div className="w-[255px] h-[40px] top-[315px] left-[476px] absolute">
            <h1 className="font-sans font-semibold w-[400px] text-[22px] leading-[40.22px]">
                Welcome Back!
            </h1>
          </div>

          <div className="w-[445px] h-[25px] top-[374px] left-[482px] absolute">
            <p className="font-sans w-[300px] text-[15px] leading-[25.14px] text-[#000000]">
                Login and enter a world of continous learning</p>
          </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
          />
         
        </form>
      </div>
    )
}

