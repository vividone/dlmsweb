"use client";

import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaBell, FaBars } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useCookies } from "@/helpers/useCookies";
import Header from "@/components/header/header";

interface Book {
  id: number;
  title: string;
  genre: string;
  cover: string;
  borrowStatus: string;
  returnDate: string;
  borrowedDate: string;
}

  const books: Book[] = [
     { id: 1, title: '', genre: '', cover: "/lone wolf.png", borrowStatus: 'Returned', returnDate: '2024-10-10', borrowedDate: '2024-09-15' },
     { id: 2, title: '', genre: '', cover: "/Robin lee.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-01' },
     { id: 3, title: "", genre: '', cover: "/Dont Look.png", borrowStatus: 'Returned', returnDate: '2024-09-30', borrowedDate: '2024-09-10' },
     { id: 4, title: '', genre: '', cover: "/Tigers heart.jpg", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-18' },
     { id: 5, title: '', genre: '', cover: "/Norse Myth.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-15' },
     { id: 6, title: '', genre: '', cover: "/spring book.jpg", borrowStatus: 'Borrowed', returnDate: '2024-10-24', borrowedDate: '2024-08-04' },
 ];

  const dashboardTwos: Book[] = [
   { id: 7,  title: '',  genre: '', cover: "/harry potter.jpg", borrowStatus: 'Returned', returnDate: '2024-10-10', borrowedDate: '2024-09-15' },
   { id: 8,  title: '',  genre: '', cover: "/Hide and seek.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-01' },
   { id: 9,  title: '',  genre: '', cover: "/spring book.jpg", borrowStatus: 'Returned', returnDate: '2024-09-30', borrowedDate: '2024-09-10' },
   { id: 10, title: '', genre: '', cover: "/lone wolf.png", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-18' },
   { id: 11, title: '', genre: '', cover: "/walk in the shadow.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-15' },
   { id: 12, title: '', genre: '', cover: "/All this Time.png", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-10' },
 ];

  const dashboardThrees: Book[] = [
   { id: 13, title: '', genre: '', cover: "/All this Time.png", borrowStatus: 'Returned', returnDate: '2024-10-10', borrowedDate: '2024-09-15' },
   { id: 14, title: '', genre: '', cover: "/Tigers heart.jpg", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-01' },
   { id: 15, title: '', genre: '', cover: "/walk in the shadow.jpg", borrowStatus: 'Returned', returnDate: '2024-09-30', borrowedDate: '2024-09-10' },
   { id: 16, title: '', genre: '', cover: "/Robin lee.jpg", borrowStatus: 'Returned', returnDate: '2024-10-12', borrowedDate: '2024-09-18' },
   { id: 17, title: "", genre: '', cover: "/Dont Look.png", borrowStatus: 'Borrowed', returnDate: 'N/A', borrowedDate: '2024-10-15' },
   { id: 18, title: '', genre: '', cover: "/Norse Myth.jpg", borrowStatus: 'Returned', returnDate: 'N/A', borrowedDate: '2024-10-12' },
 ];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [data, setData] = useState([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedBorrowStatus, setSelectedBorrowStatus] = useState<string>("All");
  const [selectedReturnDate, setSelectedReturnDate] = useState<string>("All");
  const [selectedBorrowedDate, setSelectedBorrowedDate] = useState<string>("All");
  const { getCookies } = useCookies()
  
// Fetch books from API
  useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await axios.get("https://dlms-backend.onrender.com/books", {
            headers: {
              Authorization: `Bearer ${getCookies().access_token}`,
            },
          });
          setData(response.data);
          setFilteredBooks(response.data); // Initially show all books
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      fetchBooks();
    }, [getCookies]);

  useEffect(() => {
    const allBooks = data;
    const searchFilteredBooks = allBooks.filter((book: any) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(searchFilteredBooks);
  }, [searchTerm, data]);



   // Handle other filters (borrow status, return date, etc.)
   useEffect(() => {
    const allBooks = data;
    let filteredBooks = allBooks;

    if (selectedBorrowStatus !== 'All') {
      filteredBooks = filteredBooks.filter((book:any) => book.borrowStatus === selectedBorrowStatus);
    }

    if (selectedReturnDate !== 'All') {
      filteredBooks = filteredBooks.filter((book:any) => book.returnDate === selectedReturnDate);
    }

    if (selectedBorrowedDate !== 'All') {
      filteredBooks = filteredBooks.filter((book:any) => book.borrowedDate === selectedBorrowedDate);
    }

    setFilteredBooks(filteredBooks);
  }, [selectedBorrowStatus, selectedReturnDate, selectedBorrowedDate, data]);


  useEffect(() => {
    const allBooks = data;
    const genreFilteredBooks = selectedGenre === 'All'
      ? allBooks
      : allBooks.filter((book: any )=> book.genre === selectedGenre);
    setFilteredBooks(genreFilteredBooks);
  }, [selectedGenre, data]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    // close dropdown if clicked
    if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
       setDropdownOpen(false);
    }
    // close menu if clicked outside
    if(menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
    <Header/>

      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="relative w-full sm:w-1/2 mb-4 sm:mb-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type book name or author"
            className="w-full text-sm text-black p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute text-sm right-3 top-5 sm:top-5 text-gray-500" />
        </div>
       
       {/*Filter dropdowns */}
        <div className='flex flex-wrap sm:flex-nowrap gap-4 items-center'>
           <span className="text-black text-sm">Sort by:</span>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="p-2 text-sm text-black border rounded-md cursor-pointer"
          >
            <option value="All">Genre</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Business">Business</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Drama">Drama</option>
            <option value="Geography">Geography</option>
            <option value="Education">Education</option>
          </select>
          
        <select 
          value={selectedBorrowStatus}
          onChange={(e) => setSelectedBorrowStatus(e.target.value)}
          className="p-2 text-sm text-black border rounded-md cursor-pointer">
            <option value="All">Borrowal Status</option>
            <option value="Borrowed">Borrowed</option>
             <option value="Returned">Returned</option>
          </select>

        <select 
          value={selectedReturnDate}
          onChange={(e) => setSelectedReturnDate(e.target.value)}           
          className="p-2 text-sm text-black border rounded-md cursor-pointer">
            <option value="All">Return Date</option>
            <option value="2024-10-10">2024-10-10</option>
            <option value="2024-11-05">2024-11-05</option>
          </select>

        <select 
           value={selectedBorrowedDate}
           onChange={(e) => setSelectedBorrowedDate(e.target.value)}  
           className="p-2 text-sm text-black border rounded-md cursor-pointer">
            <option value="All">Date Borrowed</option>
            <option value="2024-09-15">2024-09-15</option>
            <option value="2024-10-01">2024-10-01</option>
          </select>
        </div>
      </div>

      {/* Returned Rentals */}
      <div className="flex justify-between items-center text-black">
        <h3 className="font-bold text-lg">All Rentals</h3>
      </div>

      {/* Book Collection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredBooks.map((book) => (
          <Link key={book.id} href={`/book/${book.id}`}>
            <div className="p-4 rounded-md hover:shadow-lg cursor-pointer">
              <Image
                src={book.cover ? book.cover : '/book-cover-generic.jpg'}
                alt={book.title}
                width={192}
                height={300}
                className="rounded-md w-full h-auto"
              />
              <h2 className="mt-2 font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-500">{book.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
