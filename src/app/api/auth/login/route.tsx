import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try{
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const response = await fetch("https://dlms-backend.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }), 
        });


        if (response.ok) {
            const data = await response.json();
            return NextResponse.json({ message: 'Login successful', token: data.token });
        } else {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.message }, { status: response.status });
        }
    } catch (error) {
        return NextResponse.json({ error: 'An error occured during login' }, { status: 500 });
    }
}