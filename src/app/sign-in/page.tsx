"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
         
        if (!email || !password) {
            setError("Both email and password are required.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // api implementation

        try {
            const response = await fetch('https://dlms-backend.onrender.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify
                ({ 
                    email, 
                    password 
                }),
            });


            if(response.ok) {
                const data = await response.json();
                setSuccess("Login successful!");
                setError(null);
                router.push("/dashboard")
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed. Please check your credientials.")
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    }

    
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="flex flex-col items-center p-4 sm:p-8">
            <h1 className="text-[#0661E8] relative lg:right-[122px] text-4xl font-bold mt-8 sm:mt-16 mb-4">
                BookaThon
            </h1>

            <h2 className="text-lg text-black mt-10 font-semibold relative lg:right-[135px] sm:text-2xl mb-2">
                Welcome Back!
            </h2>
            <p className="text-sm text-black text-gray-700 mb-8 text-center max-w-sm relative lg:right-[78px]">
                Login and enter a world of continuous learning
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                {error && <div className="text-red-500 text-sm">{error}</div>}
                {success && <div className="text-green-500 text-sm">{success}</div>}

            {/*Input field for Email Address */}           
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

            {/*Input field for Password */}
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
                    <div
                        className="absolute inset-y-0 top-2 right-4 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <FaEyeSlash size={20} className="text-gray-600" />
                        ) : (
                            <FaEye size={20} className="text-gray-600" />
                        )}
                    </div>
                </div>

            {/*Remember me checkbox */}
                <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-sm text-black font-semibold">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="cursor-pointer"
                        />
                        Remember Me
                    </label>
                    <Link href="/forget-password" className="text-[#0661E8] text-sm hover:text-blue-700">
                        Forgotten Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-[#0661E8] text-white rounded-md hover:bg-blue-600"
                    aria-label="Login"
                >
                    Login
                </button>
            </form>

            <div className="mt-6 text-sm text-center text-black">
                <span>
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-[#0661E8] hover:text-blue-700">
                        Register Now
                    </Link>
                </span>
            </div>
        </div>
    );
};
