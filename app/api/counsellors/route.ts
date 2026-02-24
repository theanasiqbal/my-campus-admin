import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("counsellors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Map DB fields → frontend-friendly fields
    const counsellors = data.map((c) => ({
      id: c.id,
      name: c.name,
      charges: c.charges,
      image: c.image,
      speciality: c.speciality,
      bio: c.bio,
      status: c.status,
      createdAt: new Date(c.created_at),
    }));

    return NextResponse.json({ counsellors });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch counsellors" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, speciality, charges, bio, image, status, phone, email } = body;

    if (!name || !speciality || !charges || !bio || !status || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabaseAdmin
      .from("counsellors")
      .insert([
        {
          name,
          speciality,
          charges,
          bio,
          image,
          status,
          phone,
          email
        },
      ])
      .select()
      .single();

      const {  error: usersError } = await supabaseAdmin
      .from("users")
      .insert([
        {
          id: user.id,
          name,
          phone,
          email,
          role: "counsellor",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, counsellor: user });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
