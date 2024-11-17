import type { Metadata } from "next";
import localFont from "next/font/local";
import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext/page";


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
        <UserProvider>
        {children}
        </UserProvider>
      </body>
    </html>
  );
}

