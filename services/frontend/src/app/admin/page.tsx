import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Display Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Url</TableHead>
            <TableHead>Bio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Wei Jun</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>ang.weijun1999@gmail.com</TableCell>
            <TableCell>null</TableCell>
            <TableCell>Wei Jun</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
