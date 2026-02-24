"use client"

import { useState } from "react"
import { Search, Filter, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserTable, StudentUser } from "@/components/admin/user-table"
import { Button } from "@/components/ui/button"

export function UsersClient({ initialUsers }: { initialUsers: StudentUser[] }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState<string>("latest")

    // Filter and sort users
    const filteredUsers = initialUsers
        .filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.phone && user.phone.includes(searchQuery))
            return matchesSearch
        })
        .sort((a, b) => {
            if (sortOrder === "latest") {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            } else if (sortOrder === "oldest") {
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            }
            return 0
        })

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Registered Users</h1>
                    <p className="text-slate-500 mt-1 flex items-center gap-2">
                        Manage your platform's students and attendees. Subscriptions and statuses.
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
                        placeholder="Search by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-indigo-500"
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-[160px] bg-slate-50/50 border-slate-200">
                            <Filter className="mr-2 h-4 w-4 text-slate-400" />
                            <SelectValue placeholder="Sort by Date" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">Newest first</SelectItem>
                            <SelectItem value="oldest">Oldest first</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <UserTable users={filteredUsers} />
        </div>
    )
}
