import { useCookies } from "@/helpers/useCookies";
import { useLocalStorage } from "@/helpers/useLocalStorage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaBell } from "react-icons/fa";

export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const[menuOpen, setMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [,setUser] = useLocalStorage("user", [])
    const { removeCookie } = useCookies()
    const router = useRouter()

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    const handleClickOutside = (event: MouseEvent) => {
      // close dropdown if clicked
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }

      // close menu if clicked outside 
      if(menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const signOut = () => {
        setUser(null)
        removeCookie("access_token");
        router.push("/sign-in")
    }

    return (
        <header className="flex justify-between items-center sm:flex-row mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-8">
            <h1 className="text-3xl font-bold text-[#0061E8]">BookaThon</h1>
            
            {/*full nav links for larger screen */}
            <nav className="hidden sm:flex space-x-6">
            <Link href="/account/library" className="text-blue-500 text-base font-semibold hover:text-blue-500">
            Library
            </Link>
            <Link href="/account/shelf/borrowed" className="text-blue-500 text-base font-semibold hover:text-blue-500">
            Borrowed
            </Link>
            <Link href="/account/shelf/returned" className="text-blue-500 text-base font-semibold hover:text-blue-500">
            Returned
            </Link>
            <Link href="/account/shelf/borrowed" className="text-blue-500 text-base font-semibold hover:text-blue-500">
            Overdue
            </Link>
            </nav>

            {/* Notification, Profile, and Hamburger Menu for mobile */}
            <div className="flex items-center space-x-2 sm:space-x-4 absolute top-2 pr-6 right-0 sm:absolute top-2">
                {/* Mobile hamburger menu */}
                <div className="sm:hidden flex items-center text-black absolute top-5 right-20">
                <FaBars
                    className="text-md cursor-pointer" 
                    onClick={() => setMenuOpen(!menuOpen)} 
                />
                    {/* Conditionally render the pop-up menu with smooth transition */}
                    {menuOpen && (
                    <div 
                        ref={menuRef}
                        className="absolute top-12 right-0 w-48 bg-white border rounded-md shadow-lg z-10 transition-all duration-300 transform opacity-100 scale-100"
                        style={{
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen ? 'scale(1)' : 'scale(0.95)',
                        }}
                    >
                                  <Link href="/account/library" className="text-blue-500 text-base font-semibold hover:text-blue-500">
     Library
     </Link>
     <Link href="/account/shelf/borrowed" className="text-blue-500 text-base font-semibold hover:text-blue-500">
     Borrowed
     </Link>
     <Link href="/account/shelf/returned" className="text-blue-500 text-base font-semibold hover:text-blue-500">
     Returned
     </Link>
     <Link href="/account/shelf/borrowed" className="text-blue-500 text-base font-semibold hover:text-blue-500">
     Overdue
     </Link>
                    </div>
                    )}
                    </div>
                </div>
            </div>
                 
            {/* Notification and Profile */}
            <div className="flex items-center space-x-2 sm:space-x-2 absolute top-2 pr-6 right-0 sm:absolute top-2">
                <FaBell className="text-sm text-gray-600 cursor-pointer hover:text-blue-500" />
                <Image
                    src="/user-avatar.jpg" 
                    alt="Avatar" 
                    width={20} 
                    height={10} 
                    className="w-6 h-6 border rounded-full cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                />
                {dropdownOpen && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 sm:right-0 text-sm bg-white border rounded-md shadow-lg">
                        <button onClick={signOut}>
                            <div className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                            Sign Out
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}