"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, UserCog, LogOut, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Counsellors", href: "/admin/counsellors", icon: UserCog },
  { name: "Users", href: "/admin/users", icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <GraduationCap className="h-8 w-8 text-primary" />
        <span className="ml-3 text-lg font-bold tracking-tight">My Campus</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto py-4">
        <nav className="flex-1 space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon
                  className={cn("mr-3 h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground")}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <button className="flex w-full items-center px-3 py-2 text-sm font-medium text-destructive rounded-md hover:bg-destructive/10 transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
