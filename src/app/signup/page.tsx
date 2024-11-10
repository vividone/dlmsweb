"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignUp() {
    const [fullname, setFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [homeAddress, setHomeAddress] = useState<string>('');
    const [role, setRole] = useState<string>('individual');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        let isError = false

        if (fullname.length < 4) {
            setError("Fullname is required")
            isError = true
        };
        if (email === "" || password === "") {
            setError("Both email and password are required.")
            isError = true
        };
        if (homeAddress === "") {
            setError("Home Address is required.")
            isError = true
        };
        if (!validateEmail(email)) {
            setError("Please enter a valid email address")
            isError = true
        };
        if (!validatePassword(password)) {
            setError("Password must include an uppercase, a lowercase, and a special character.");
            isError = true
        } 

        if(isError) return;

        submitSignup();
    };

    const submitSignup = async() => {
            // Perform API call for Sign Up
        setIsLoading(true)
    try {
        const response = await fetch(`https://dlms-backend.onrender.com/auth/${role === "individual" ? "user" : "librarian"}/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({fullname, email, password, homeAddress, role, name: role === "individual" ? "user" : "librarian"})
        })
    
        if(response.ok){
            const data = await response.json();
            setSuccess("Signup successful! Please login.");
            setIsLoading(false)
        } else {
            const errorData = await response.json();
            setError(errorData.message || "Signup failed. Please try again.")
            setIsLoading(false)
        }
    } catch (err) {
        setError("An error occurred. Please try again later.")
    }
    }

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password: string) => {
        if(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            console.log(true)
            return true
        }
        else return false
    }
    return (
        <div className="flex flex-col items-center p-4 sm:p-8 overflow-x-hidden">
            <h1 className="text-[#0661E8] text-4xl lg:relative right-[122px]  font-bold mt-8 sm:mt-16 mb-4">
                BookaThon
            </h1>

            <h2 className="text-lg text-black mt-10 font-semibold lg:relative right-[168px] sm:text-2xl mb-2">
              Hi, there!
              </h2>
            <p className="text-sm text-black text-gray-700 mb-8 text-center max-w-sm lg:relative right-[74px]">
                Ready to join a family of leaders? Signup now
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

                <div className="space-y-1 text-black">
                    <label className="block text-sm font-semibold">Full Name</label>
                    <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Input your full name"
                        className="w-full px-4 py-3 border rounded-md"
                        aria-required="true"
                    />
                </div>

                <div className="space-y-1 text-black">
                    <label className="block text-sm font-semibold">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border rounded-md"
                        aria-required="true"
                    />
                </div>
                <div className="space-y-1 text-black">
                    <label className="block text-sm font-semibold">Home Address</label>
                    <input
                        type="text"
                        value={homeAddress}
                        onChange={(e) => setHomeAddress(e.target.value)}
                        placeholder="Enter your home address"
                        className="w-full px-4 py-3 border rounded-md"
                        aria-required="true"
                    />
                </div>
                <div className="space-y-1 text-black">
                    <label className="block text-sm font-semibold">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md"
                        aria-required="true"
                    >
                        <option>Individual</option>
                        <option>Librarian</option>
                    </select>
                </div>

                <div className="relative space-y-1 text-black">
                    <label className="block text-sm font-semibold">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border rounded-md"
                        aria-required="true"
                    />
                    
                    <p className="text-xs font-semibold text-gray-600 mt-1">
                        Password must include an uppercase, a lowercase, and a special character
                    </p>
                    <div
                        className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <FaEyeSlash size={20} className="text-gray-600" />
                        ) : (
                            <FaEye size={20} className="text-gray-600" />
                        )}
                    </div>
                </div> 

                <button
                    type="submit"
                    className="w-full py-3 bg-[#0661E8] text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
                    aria-label="Signup"
                >
                    { isLoading ? 
                        <div
                        className=" w-6 h-6 rounded-full border-2 animate-spin border-white border-b-transparent"
                    />
                    : "Submit" }
                </button>
            </form>

            <div className="mt-6 text-sm text-center text-black">
                <span>
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-[#0661E8] hover:text-blue-700">
                        Login
                    </Link>
                </span>
            </div>
        </div>
    );
}
