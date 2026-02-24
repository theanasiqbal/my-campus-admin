import { Suspense } from "react"
import { supabaseAdmin } from "@/lib/supabase"
import { UsersClient } from "@/components/admin/users-client"
import { StudentUser } from "@/components/admin/user-table"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function UsersPage() {
  // Fetch users server-side
  const { data: users, error } = await supabaseAdmin
    .from("students")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching students:", error)
  }

  return (
    <Suspense fallback={<div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>}>
      <UsersClient initialUsers={(users as StudentUser[]) || []} />
    </Suspense>
  )
}
