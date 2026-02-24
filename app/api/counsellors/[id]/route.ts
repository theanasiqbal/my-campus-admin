import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        console.log(id);
        const body = await request.json();
        console.log(body);

        // Remove single() to prevent "Cannot coerce" error if update returns 0 rows
        const { data, error } = await supabaseAdmin
            .from("counsellors")
            .update(body)
            .eq("id", id)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            return NextResponse.json({ error: "Counsellor not found or no changes made." }, { status: 404 });
        }

        return NextResponse.json({ counsellor: data[0] }, { status: 200 });
    } catch (error: any) {
        console.error("Update Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;

        const { error } = await supabaseAdmin
            .from("counsellors")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
