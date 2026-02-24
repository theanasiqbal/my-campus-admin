import { Users, GraduationCap, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabaseAdmin } from "@/lib/supabase"
import { Suspense } from "react"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminDashboard() {
  // Fetch data in parallel
  const [
    { count: totalUsersRes },
    { count: totalCounsellorsRes }
  ] = await Promise.all([
    supabaseAdmin.from("students").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("counsellors").select("*", { count: "exact", head: true })
  ])

  // Assuming all are active for now since we don't have explicit status fields built into the simplified schemas shown
  const stats = {
    totalCounsellors: totalCounsellorsRes || 0,
    activeCounsellors: totalCounsellorsRes || 0,
    inactiveCounsellors: 0,
    totalUsers: totalUsersRes || 0,
    activeUsers: totalUsersRes || 0,
    inactiveUsers: 0,
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Overview of your counselling platform
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Counsellors */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total Counsellors
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.totalCounsellors}</div>
            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>{stats.activeCounsellors} Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <XCircle className="h-4 w-4 text-rose-500" />
                <span>{stats.inactiveCounsellors} Inactive</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Counsellors */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Active Counsellors
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.activeCounsellors}</div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {stats.totalCounsellors > 0 ? ((stats.activeCounsellors / stats.totalCounsellors) * 100).toFixed(0) : 0}% of total
            </p>
          </CardContent>
        </Card>

        {/* Inactive Counsellors */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Inactive Counsellors
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-rose-50 flex items-center justify-center">
              <XCircle className="h-4 w-4 text-rose-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.inactiveCounsellors}</div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {stats.totalCounsellors > 0 ? ((stats.inactiveCounsellors / stats.totalCounsellors) * 100).toFixed(0) : 0}% of total
            </p>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Total Users</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.totalUsers}</div>
            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>{stats.activeUsers} Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <XCircle className="h-4 w-4 text-rose-500" />
                <span>{stats.inactiveUsers} Inactive</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Active Users</CardTitle>
            <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.activeUsers}</div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {stats.totalUsers > 0 ? ((stats.activeUsers / stats.totalUsers) * 100).toFixed(0) : 0}% of total
            </p>
          </CardContent>
        </Card>

        {/* Inactive Users */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Inactive Users</CardTitle>
            <div className="h-8 w-8 rounded-full bg-rose-50 flex items-center justify-center">
              <XCircle className="h-4 w-4 text-rose-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.inactiveUsers}</div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {stats.totalUsers > 0 ? ((stats.inactiveUsers / stats.totalUsers) * 100).toFixed(0) : 0}% of total
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
