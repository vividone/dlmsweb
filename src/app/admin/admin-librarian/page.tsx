"use client";

import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaBell, FaBars, FaEdit, FaTrash } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

interface Book {
  id: number;
  title: string;
  genre: string;
  cover: string;
  description: string;
}

export default function LibrarianPage() {
  const [books, setBooks] = useState<Book[]>([]); // Books list
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // States for create/edit modal
  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: "",
    genre: "",
    cover: "",
    description: "",
  });

  // Filter books based on search and genre
  useEffect(() => {
    const searchFilteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(
      selectedGenre === "All"
        ? searchFilteredBooks
        : searchFilteredBooks.filter((book) => book.genre === selectedGenre)
    );
  }, [searchTerm, selectedGenre, books]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  // Create or Update Book
  const handleSaveBook = () => {
    if (isEditing && editingBook) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingBook.id ? { ...newBook, id: editingBook.id } : book
        )
      );
    } else {
      setBooks((prevBooks) => [
        ...prevBooks,
        { ...newBook, id: Date.now() }, // Generate unique ID
      ]);
    }
    setModalOpen(false);
    setNewBook({ id: 0, title: "", genre: "", cover: "", description: "" });
    setIsEditing(false);
  };

  // Edit Book
  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setNewBook(book);
    setIsEditing(true);
    setModalOpen(true);
  };

  // Delete Book
  const handleDeleteBook = (bookId: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8 sm:flex-row space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold text-[#0661E8]">BookaThon</h1>

          <nav className="hidden sm:flex space-x-6">
            <Link href="/homepage" className="text-blue-500 font-semibold hover:text-blue-500">
              Library
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2 sm:space-4">
          <FaBell className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer" />
          <Image
            src="/user-avatar.jpg"
            alt="Avatar"
            width={20}
            height={10}
            className="w-6 h-6 border rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <Link href="/sign-in">
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Sign Out</div>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type book name or author"
            className="w-full text-sm p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="text-sm absolute right-3 top-5 text-gray-500" />
        </div>

        <div className="flex gap-4 items-center text-black p-2">
          <span className="text-sm text-black">Sort by:</span>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="p-2 text-sm border rounded-md cursor-pointer"
          >
            <option value="All">Genre</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Drama">Drama</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
            <option value="Geography">Geography</option>
          </select>
        </div>
      </div>

      {/* Book Collection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredBooks.map((book) => (
          <div key={book.id} className="p-4 rounded-md hover:shadow-lg cursor-pointer relative">
            <Image src={book.cover} alt={book.title} width={192} height={300} className="rounded-md w-full h-auto" />
            <h2 className="mt-2 font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-500">{book.genre}</p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <FaEdit
                className="text-blue-500 cursor-pointer"
                onClick={() => handleEditBook(book)}
              />
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => handleDeleteBook(book.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Book Button */}
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        onClick={() => setModalOpen(true)}
      >
        Add Book
      </button>

      {/* Modal for Adding/Editing Book */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Book" : "Add Book"}</h2>
            <input
              type="text"
              placeholder="Book Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Genre"
              value={newBook.genre}
              onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Cover URL"
              value={newBook.cover}
              onChange={(e) => setNewBook({ ...newBook, cover: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <textarea
              placeholder="Description"
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleSaveBook}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
