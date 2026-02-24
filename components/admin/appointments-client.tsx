"use client"

import { useState } from "react"
import { Search, Filter, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppointmentTable, Appointment } from "@/components/admin/appointment-table"
import { Button } from "@/components/ui/button"

export function AppointmentsClient({ initialAppointments }: { initialAppointments: Appointment[] }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [sortOrder, setSortOrder] = useState<string>("latest")

    // Filter and sort appointments
    const filteredAppointments = initialAppointments
        .filter((apt) => {
            const matchesSearch =
                apt.counselee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                apt.counselee_phone.includes(searchQuery) ||
                (apt.counselee_email && apt.counselee_email.toLowerCase().includes(searchQuery.toLowerCase()))

            const matchesStatus = statusFilter === "all" || apt.status === statusFilter
            return matchesSearch && matchesStatus
        })
        .sort((a, b) => {
            if (sortOrder === "latest") {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            } else if (sortOrder === "oldest") {
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            } else if (sortOrder === "upcoming") {
                // Sort by appointment date if it exists
                const dateA = a.appointment_date ? new Date(a.appointment_date).getTime() : 0;
                const dateB = b.appointment_date ? new Date(b.appointment_date).getTime() : 0;
                return dateB - dateA;
            }
            return 0
        })

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Appointments</h1>
                    <p className="text-slate-500 mt-1">
                        Manage counseling sessions and bookings.
                    </p>
                </div>
                <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50 text-slate-700 border-slate-200">
                    <Download className="h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center transition-all hover:shadow-md">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                        placeholder="Search by student name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-indigo-500"
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-[160px] bg-slate-50/50 border-slate-200">
                            <Filter className="mr-2 h-4 w-4 text-slate-400" />
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="latest">Newest Booked</SelectItem>
                            <SelectItem value="oldest">Oldest Booked</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[150px] bg-slate-50/50 border-slate-200">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <AppointmentTable appointments={filteredAppointments} />
        </div>
    )
}
