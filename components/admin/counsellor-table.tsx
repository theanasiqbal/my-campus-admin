"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Award, MoreHorizontal, Edit, Trash, Lock, Unlock } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Counsellor = {
  id: string;
  name: string;
  charges: number;
  image: string;
  speciality: string;
  bio: string;
  status: "active" | "inactive";
  createdAt: Date;
};

interface CounsellorTableProps {
  counsellors: Counsellor[];
  onToggleStatus: (id: string) => void;
  onEdit: (counsellor: Counsellor) => void;
  onDelete: (counsellor: Counsellor) => void;
}

export function CounsellorTable({
  counsellors,
  onToggleStatus,
  onEdit,
  onDelete,
}: CounsellorTableProps) {
  if (counsellors.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-100 items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">
              No counsellors found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or add a new counsellor
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="py-0">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Counsellor</TableHead>
                <TableHead>Speciality</TableHead>
                <TableHead>Charges</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {counsellors.map((counsellor) => (
                <TableRow key={counsellor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
                        <Image
                          src={
                            counsellor.image ||
                            "/placeholder.svg?height=40&width=40"
                          }
                          alt={counsellor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{counsellor.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {counsellor.bio}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className=" text-sm text-muted-foreground">
                        <span>{counsellor.speciality}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground font-medium ">
                      <span>${counsellor.charges}/hr</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        counsellor.status === "active" ? "default" : "outline"
                      }
                      className={
                        counsellor.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "border-red-200 text-red-800"
                      }
                    >
                      {counsellor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(counsellor.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onToggleStatus(counsellor.id)}>
                          {counsellor.status === "active" ? (
                            <>
                              <Lock className="mr-2 h-4 w-4 text-slate-500" />
                              <span>Deactivate</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="mr-2 h-4 w-4 text-slate-500" />
                              <span>Activate</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(counsellor)}>
                          <Edit className="mr-2 h-4 w-4 text-slate-500" />
                          <span>Edit details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(counsellor)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete counsellor</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
