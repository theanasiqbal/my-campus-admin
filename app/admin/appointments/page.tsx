import { Suspense } from "react"
import { supabaseAdmin } from "@/lib/supabase"
import { AppointmentsClient } from "@/components/admin/appointments-client"
import { Appointment } from "@/components/admin/appointment-table"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AppointmentsPage() {
    // Fetch appointments server-side
    const { data: appointments, error } = await supabaseAdmin
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching appointments:", error)
    }

    return (
        <Suspense fallback={<div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>}>
            <AppointmentsClient initialAppointments={(appointments as Appointment[]) || []} />
        </Suspense>
    )
}
