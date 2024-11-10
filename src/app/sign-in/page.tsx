"use client";

import { useCookies } from "@/helpers/useCookies";
import { useLocalStorage } from "@/helpers/useLocaStorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { setCookie } = useCookies()
    const [ setUserData ] = useLocalStorage("user", {})
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        let isError = false

        if (email === "" || password === "") {
            setError("Both email and password are required.")
            isError = true
        };

        if (!validateEmail(email)) {
            setError("Email address not valid");
            isError = true
            return;
        }

        if(isError) return;

        submitSignIn();
    };

    const submitSignIn = async() => {
        setIsLoading(true)
        try {
            const response = await fetch("https://dlms-backend.onrender.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if(response.ok) {
                const data = await response.json();
                setSuccess("Login successful!");
                setCookie("token", data.token.access_token)
                setUserData(data.data)
                setIsLoading(false)
                setError(null);
                router.push("/dashboard")
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed. Please check your credientials.")
                setIsLoading(false)
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
                    className="w-full py-3 bg-[#0661E8] text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
                    aria-label="Signup"
                >
                    { isLoading ? 
                        <div
                        className=" w-6 h-6 rounded-full border-2 animate-spin border-white border-b-transparent"
                    />
                    : "Login" }
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
}
