"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  category: string;
  author: string;
  cover: string;
}

type BooksContextType = Book[];

const BooksContext = createContext<BooksContextType | undefined>(undefined);

interface BooksProviderProps {
  children: ReactNode;
}

export const OverdueBooksProvider: React.FC<BooksProviderProps> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>(
          "https://dlms-backend.onrender.com/borrow/overdue"
        );
        setBooks(response.data);
      } catch (error: any) {
        console.log("Error fetching books:", error?.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={books}>{children}</BooksContext.Provider>
  );
};

export const useOverdueBooks = (): BooksContextType => {
  const context = useContext(BooksContext);

  if (context === undefined) {
    return [];
  }

  return context;
};