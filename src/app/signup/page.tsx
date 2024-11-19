"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [homeAddress, setHomeAddress] = useState<string>("");
    const [role, setRole] = useState<string>("individual");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

     
    // Password validation state
    const [isUppercase, setIsUppercase] = useState<boolean>(false);
    const [isLowercase, setIsLowercase] = useState<boolean>(false);
    const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);

    // Check if password meets all requirements
    const isPasswordValid = isUppercase && isLowercase && hasSpecialChar;

    // Validate email format
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Validate password on input change
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setIsUppercase(/[A-Z]/.test(value));
        setIsLowercase(/[a-z]/.test(value));
        setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(value));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!name || !email || !homeAddress || !role || !password) {
            setError("All fields are required.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!isPasswordValid) {
            setError("Password must include an uppercase, a lowercase, and a special character.");
            return;
        }

        try {
            const response = await fetch("https://dlms-backend.onrender.com/auth/user/register", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ 
                    name, 
                    email, 
                    password, 
                    homeAddress, 
                    role }),
            });

            if (response.ok) {
            setSuccess("Registration successful! Please log in");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
    };

    return (
        <div className="flex flex-col items-center p-4 sm:p-8 overflow-x-hidden">
            <h1 className="text-[#0661E8] text-4xl font-bold mt-8 sm:mt-16 mb-4">BookaThon</h1>
            <h2 className="text-lg text-black mt-10 font-semibold sm:text-2xl mb-2">Hi, there!</h2>
            <p className="text-sm text-gray-700 mb-8 text-center max-w-sm">Ready to join a family of leaders? Signup now</p>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

                {/* Full Name */}
                <div className="space-y-1 text-black">
                    <label className="block text-sm font-semibold">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Input your full name"
                        className="w-full px-4 py-3 border rounded-md"
                        required
                    />
                </div>

                {/* Email Address */}
                <div className="space-y-1 text-black">
                    <label className="block text-sm font-semibold">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border rounded-md"
                        required
                    />
                </div>

                {/* Home Address */}
                <div className="space-y-1 text-black">
                    <label className="block text-sm font-semibold">Home Address</label>
                    <input
                        type="text"
                        value={homeAddress}
                        onChange={(e) => setHomeAddress(e.target.value)}
                        placeholder="Enter your home address"
                        className="w-full px-4 py-3 border rounded-md"
                        required
                    />
                </div>

                {/* Role */}
                <div className="space-y-1 text-black">
                    <label className="block text-sm font-semibold">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md"
                        required
                    >
                        <option value="individual">Individual</option>
                    </select>
                </div>

                {/* Password */}
                <div className="relative space-y-1 text-black">
                    <label className="block text-sm font-semibold">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border rounded-md"
                        required
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash size={20} className="text-gray-600" /> : <FaEye size={20} className="text-gray-600" />}
                    </div>
                </div>

                {/* Password Requirements */}
                <ul className="text-xs font-semibold text-gray-600 space-y-1 mt-1">
                    <li className={isUppercase ? "text-green-500" : "text-red-500"}>Includes uppercase</li>
                    <li className={isLowercase ? "text-green-500" : "text-red-500"}>Includes lowercase</li>
                    <li className={hasSpecialChar ? "text-green-500" : "text-red-500"}>Includes special character</li>
                </ul>

                <button
                    type="submit"
                    className={`w-full py-3 ${isPasswordValid ? "bg-[#0661E8]" : "bg-blue-700 opacity-50"} text-white rounded-md`}
                    disabled={!name || !email || !homeAddress || !role || !isPasswordValid}
                >
                    Submit
                </button>
            </form>

            <div className="mt-6 text-sm text-center text-black">
                <span>
                    Already have an account?{" "}
                    <Link href="/" className="text-[#0661E8] hover:text-blue-700">
                        Login
                    </Link>
                </span>
            </div>
        </div>
    );
}
