import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://dlms-backend.onrender.com/books", {
            headers: { "Content-Type": "application/json"},
            // cache control to revalidate every hour
            next: { revalidate: 3600 },
        }); 

        if (!response.ok) throw new Error("Failed to fetch books from external API");

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error Fetching books:", error);
        return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
    }
}