"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";

import { type User } from "@/features/users";

import { useUpdateUserRoleMutation } from "@/services/userApi";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey: "bio",
    header: "Biography",
  },
  {
    id: "actions",
    header: "Assign Roles",
    cell: ({ row }) => {
      const [updateUser] = useUpdateUserRoleMutation();
      const user = row.original;
      const handleUpdate = () => {
        updateUser({ ...user, role: "ADMIN" });
      };
      if (user.role === "USER") {
        return <Button onClick={handleUpdate}>Set as admin</Button>;
      }
    },
  },
];

interface UserTableProps {
  data: User[];
}

export default function UserTable({ data }: UserTableProps) {
  return <DataTable columns={columns} data={data} />;
}
