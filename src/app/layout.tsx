import type { Metadata } from "next";
import localFont from "next/font/local";
import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import { BooksProvider } from "@/context/bookProvider";
import { BorrowedBooksProvider } from "@/context/borrowedBooksProvider";
import { ReturnedBooksProvider } from "@/context/returnedBooksProvider";
import { OverdueBooksProvider } from "@/context/overdue";
import { RequestBooksProvider } from "@/context/bookRequestsProvider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const merriweatherSans = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Choose weights as needed
  variable: "--font-merriweather-sans", // CSS variable for Tailwind
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BookaThon",
  description: "World of Continous Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweatherSans.variable} antialiased`}
      >
        <RequestBooksProvider>
          <OverdueBooksProvider>
            <ReturnedBooksProvider>
              <BorrowedBooksProvider>
                <BooksProvider>{children}</BooksProvider>
              </BorrowedBooksProvider>
            </ReturnedBooksProvider>
          </OverdueBooksProvider>
        </RequestBooksProvider>
      </body>
    </html>
  );
}
