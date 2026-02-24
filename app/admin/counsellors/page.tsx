"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CounsellorTable } from "@/components/admin/counsellor-table";
import { AddCounsellorModal } from "@/components/admin/add-counsellor-modal";
import { Suspense } from "react";

export default function CounsellorsPage() {
  const [counsellors, setCounsellors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("latest");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const res = await fetch("/api/counsellors");
        const data = await res.json();

        if (!res.ok) {
          console.error(data.error);
          return;
        }

        setCounsellors(data.counsellors);
      } catch (err) {
        console.error("Failed to load counsellors");
      } finally {
        setLoading(false);
      }
    };

    fetchCounsellors();
  }, []);

  // Filter and sort counsellors
  const filteredCounsellors = counsellors
    .filter((counsellor) => {
      const matchesSearch =
        counsellor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        counsellor.speciality.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || counsellor.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      if (sortOrder === "latest") {
        return dateB.getTime() - dateA.getTime();
      } else if (sortOrder === "oldest") {
        return dateA.getTime() - dateB.getTime();
      }
      return 0;
    });

  const toggleStatus = (id: string) => {
    setCounsellors((prev) =>
      prev.map((counsellor) =>
        counsellor.id === id
          ? {
              ...counsellor,
              status: counsellor.status === "active" ? "inactive" : "active",
            }
          : counsellor
      )
    );
  };

  const handleAddCounsellor = async (counsellor: any) => {
    const res = await fetch("/api/counsellors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(counsellor),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data.error);
      return;
    }

    setCounsellors((prev) => [
      {
        ...data.counsellor,
        createdAt: new Date(data.counsellor.created_at),
      },
      ...prev,
    ]);
  };

  return (
    <Suspense fallback={null}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Counsellors
            </h1>
            <p className="text-muted-foreground">
              Manage your career counsellors
            </p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Counsellor
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or speciality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-35">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-35">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-muted-foreground">Loading counsellors...</div>
        ) : (
          <CounsellorTable
            counsellors={filteredCounsellors}
            onToggleStatus={toggleStatus}
          />
        )}

        {/* Add Modal */}
        <AddCounsellorModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onAdd={handleAddCounsellor}
        />
      </div>
    </Suspense>
  );
}
