"use client";

import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import BookId from "@/app/account/library/book/[bookId]/page";
import axios from "axios";
import { useCookies } from "@/helpers/useCookies";
import Image from 'next/image';
import AdminHeader from '@/components/header/adminHeader';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  bookCategory: number;
  cover: string;
  description: string;
}

interface Category {
  name: string;
}

export default function LibrarianPage() {
  const [books, setBooks] = useState<Book[]>([]); // Books list
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const { getCookies } = useCookies()

  // States for create/edit modal
  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    isbn: '',
    bookCategory: 0,
    cover: '',
    description: '',
  });

  const [newCategory, setNewCategory] = useState<Category>({
    name: ''
  });

  // Filter books based on search and genre
  useEffect(() => {
    const searchFilteredBooks = books.filter((book) =>
      book.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(
      selectedCategory === "All"
        ? searchFilteredBooks
        : searchFilteredBooks.filter((book) => "bookCategory" === selectedCategory)
    );
  }, [searchTerm, selectedCategory, books]);

    // Fetch Books from API
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await fetch("https://dlms-backend.onrender.com/books");
          const data: Book[] = await response.json();
          setBooks(data.filter((book) => book.title));
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
      fetchBooks();
      getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   // Fetch Single Book by ID
   const fetchBookById = async (bookId: number) => {
    try {
      const response = await fetch(`https://dlms-backend.onrender.com/books/${bookId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch book details.");
      }
      const book: Book = await response.json();
      return book;
    } catch (error) {
      console.error("Error fetching book by ID:", error);
      return null;
    }
  };
  const addBook = async () => {
    try {
      await axios.post("https://dlms-backend.onrender.com/books/new", 
        { title: newBook.title, isbn: new Date(), bookCategory: newBook.bookCategory, author: newBook.author, description: newBook.description },
        {
          headers: {
          "Authorization": `Bearer ${getCookies().access_token}`
        }}
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  const addCategory = async () => {
    try {
      await axios.post("https://dlms-backend.onrender.com/categories/create", 
        { name: category },
        {
          headers: {
          "Authorization": `Bearer ${getCookies().access_token}`
        }}
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  const updateBook = async () => {
    try {
      if (!editingBook) return;
      const response = await fetch(`https://dlms-backend.onrender.com/books/update/${editingBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookies().access_token}`
         },
        body: JSON.stringify(newBook),
      });
      const updatedBook: Book = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      );
      setModalOpen(false);
      setEditingBook(null);
      setNewBook({ id: 0, title: "", author: "", isbn: "", bookCategory: 0, cover: "", description: "" });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  const deleteBook = async (bookId: number) => {
    deleteBook(bookId)

    try {
      await fetch(`https://dlms-backend.onrender.com/books/delete/${bookId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookies().access_token}`
         },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const getCategories = async () => {
    try {
      await axios.get(`https://dlms-backend.onrender.com/categories`,
        {
          headers: {
          "Authorization": `Bearer ${getCookies().access_token}`
        }}
      )
      .then(response => setCategories(response.data));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Create or Update Book
  const handleSaveBook = async () => {
    if (isEditing && editingBook) {
      await updateBook();
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingBook.id ? { ...newBook, id: editingBook.id } : book
        )
      );
    } else {
      await addBook();
      setBooks((prevBooks) => [
        ...prevBooks,
        { ...newBook, id: Date.now() }, // Generate unique ID
      ]);
    }
    setModalOpen(false);
    setNewBook({ id: 0, title: "", author: "", isbn: "", bookCategory: 0, cover: "", description: "" });
    setIsEditing(false);
  };

  // Edit Book
  const handleEditBook = async (bookId: number) => {
    const bookDetails = await fetchBookById(bookId);
    if (bookDetails) {
      setEditingBook(bookDetails);
      setNewBook(bookDetails);
      setIsEditing(true);
      setModalOpen(true);
    }
  };

  // Delete Book
  const handleDeleteBook = (bookId: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <AdminHeader/>
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 text-sm border rounded-md cursor-pointer"
          >
            <option value="All">All Categories</option>
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
            <Image src={"/" + book?.title + ".png" || '/lone wolf.png'} 
            alt={book.title} 
            width={192} 
            height={300} 
            className="rounded-md w-full h-auto" 
            />
            <h2 className="mt-2 font-semibold text-black">{book.title}</h2>
            <p className="text-sm text-black">{book.bookCategory}</p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <FaEdit
                className="text-blue-500 cursor-pointer"
                onClick={() => handleEditBook(book.id)}
              />
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => handleDeleteBook(book.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">

        {/* Add Book Button */}
        <button
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          Add Book
        </button>
        <button
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
          onClick={() => setCategoryModalOpen(true)}
        >
          Add Category
        </button>
      </div>

      
      {/* Modal for Adding category */}
      {categoryModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 text-black">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Add Category</h2>
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-black"
                onClick={() => setCategoryModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={addCategory}
              >
                Save
              </button>
            </div>
          </div>
      </div>
      )
    }

      {/* Modal for Adding/Editing Book */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 text-black">
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
              placeholder="Author name"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            />
              <input
              type="text"
              placeholder="ISBN"
              value={newBook.isbn}
              onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            />
              <select
            value={selectedCategory}
            onChange={(e) => setNewBook({ ...newBook, bookCategory: parseFloat(e.target.value)})}
            className="w-full mb-4 p-2 py-3 text-sm border rounded-md cursor-pointer"
            >
              {
                categories.map((item: { id: number, name: string }) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))
              }
            </select>
            <textarea
              placeholder="Description"
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              className="w-full mb-4 p-2 border rounded-md"
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-black"
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
