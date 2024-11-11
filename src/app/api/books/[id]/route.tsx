import { NextResponse } from 'next/server';

// Fetch a single book from the API by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const res = await fetch(`https://dlms-backend.onrender.com/api/books/${id}`);
    if (!res.ok) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    const book = await res.json();
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching the book.' }, { status: 500 });
  }
}
