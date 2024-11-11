import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { fullname, email, homeAddress, role,  password,} = await request.json();

    const response = await fetch("/api/auth/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, homeAddress, role, password }), 
    });

    

    if(!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ error: errorData.message }, { status: response.status});
    }

    const data = await response.json();
    return NextResponse.json(data);
    } catch(error) {
        return NextResponse.json({ error: 'An error occurred during registration.' }, { status: 500 });    
    }
}