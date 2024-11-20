"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError(null);
      
    }
  };

  return (
    <div className="container mx-auto mt-10 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#0661E8]">BookaThon</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 space-y-8">
        <div className="relative">
          <label className="font-semibold text-sm text-black">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            className="w-full p-4 mt-2 rounded-md border text-black"
            aria-required="true"
          />
          <div
            className="absolute right-5 top-10 cursor-pointer text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </div>
        </div>

        <div className="relative">
          <label className="font-semibold text-sm text-black">Confirm New Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            className="w-full p-4 mt-2 rounded-md border text-black"
            aria-required="true"
          />
          <div
            className="absolute right-5 top-10 cursor-pointer text-black"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-md font-semibold"
        >
          Reset Password
        </button>
      </form>

      <div className="text-center mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
