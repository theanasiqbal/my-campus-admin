"use server"

import { revalidatePath } from "next/cache"
import { supabaseAdmin } from "@/lib/supabase"

export async function updateStudent(id: string, data: { name: string; email: string; phone: string }) {
    const { error } = await supabaseAdmin
        .from("students")
        .update({
            name: data.name,
            email: data.email,
            phone: data.phone || null
        })
        .eq("id", id)

    if (error) {
        console.error("Error updating student:", error)
        return { success: false, error: error.message }
    }

    revalidatePath("/admin/users")
    return { success: true }
}

export async function deleteStudent(id: string) {
    const { error } = await supabaseAdmin
        .from("students")
        .delete()
        .eq("id", id)

    if (error) {
        console.error("Error deleting student:", error)
        return { success: false, error: error.message }
    }

    revalidatePath("/admin/users")
    return { success: true }
}
