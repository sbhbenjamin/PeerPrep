import React from "react";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const page = () => {
  return (
    <div>
      <Table />
      <TableHeader>
        <TableRow>
          <TableHead>Display Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Url</TableHead>
          <TableHead>Bio</TableHead>
        </TableRow>
      </TableHeader>
    </div>
  );
};

export default page;
