import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, IndianRupee, MapPin } from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export type Appointment = {
    id: string
    student_id: string
    counsellor_id: string
    counselee_name: string
    counselee_phone: string
    counselee_email: string | null
    amount: number
    status: "pending" | "paid" | "completed" | "cancelled"
    appointment_date: string | null
    appointment_location: string | null
    created_at: string
}

interface AppointmentTableProps {
    appointments: Appointment[]
}

const statusColors = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    paid: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
}

export function AppointmentTable({ appointments }: AppointmentTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    if (appointments.length === 0) {
        return (
            <Card className="border-slate-200 shadow-sm">
                <CardContent className="flex min-h-[400px] items-center justify-center">
                    <div className="text-center">
                        <p className="text-lg font-medium text-slate-900">No appointments found</p>
                        <p className="text-sm text-slate-500 mt-1">Try adjusting your filters.</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const totalPages = Math.ceil(appointments.length / itemsPerPage)
    const safePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages))
    const paginatedAppointments = appointments.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage)

    return (
        <div className="space-y-4">
            <Card className="border-slate-200 shadow-sm py-0 overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/80">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="font-semibold text-slate-700">Student</TableHead>
                                    <TableHead className="font-semibold text-slate-700">DateTime</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Location</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedAppointments.map((apt) => (
                                    <TableRow key={apt.id} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 text-sm font-semibold text-indigo-700 shadow-sm border border-indigo-200/50">
                                                    {apt.counselee_name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{apt.counselee_name}</p>
                                                    <p className="text-xs text-slate-500 font-mono mt-0.5">{apt.counselee_phone}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Calendar className="h-4 w-4 text-indigo-400" />
                                                <span className="text-sm font-medium">
                                                    {apt.appointment_date
                                                        ? new Date(apt.appointment_date).toLocaleString(undefined, {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })
                                                        : "TBD"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <MapPin className="h-4 w-4 text-rose-400" />
                                                <span className="text-sm">{apt.appointment_location || "Online / TBD"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-slate-700 font-medium">
                                                <IndianRupee className="h-4 w-4" />
                                                <span>{apt.amount.toLocaleString("en-IN")}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`font-medium capitalize ${statusColors[apt.status] || statusColors.pending}`}
                                            >
                                                {apt.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)) }}
                                className={safePage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <span className="text-sm font-medium text-slate-500 px-4">
                                Page {safePage} of {totalPages}
                            </span>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)) }}
                                className={safePage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}
