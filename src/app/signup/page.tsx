"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignUp() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!fullname) setError("Fullname is required");
        if (!email || !password) setError("Both email and password are required.");
        if (!validateEmail(email)) setError("Please enter a valid email address");
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="flex flex-col items-center p-4 sm:p-8">
            <h1 className="text-[#0661E8] text-4xl lg:relative right-[122px]  font-bold mt-8 sm:mt-16 mb-4">
                BookaThon
            </h1>

            <h2 className="text-lg mt-10 font-semibold lg:relative right-[168px] sm:text-2xl mb-2">
              Hi, there!
              </h2>
            <p className="text-sm text-gray-700 mb-8 text-center max-w-sm lg:relative right-[78px]">
                Ready to join a family of leaders? Signup now
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                
                <div className="space-y-1">
                    <label className="block text-sm font-semibold">Fullname</label>
                    <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Input your full name"
                        className="w-full px-4 py-3 border rounded-md"
                        aria-required="true"
                    />
                </div>

                <div className="space-y-1">
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

                <div className="relative space-y-1">
                    <label className="block text-sm font-semibold">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border rounded-md"
                        aria-required="true"
                    />
                    <p className="text-xs text-gray-600 mt-1">
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
                    className="w-full py-3 bg-[#0661E8] text-white rounded-md hover:bg-blue-600"
                    aria-label="Signup"
                >
                    Submit
                </button>
            </form>

            <div className="mt-6 text-sm text-center">
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
