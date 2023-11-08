import React from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/DataTable";

import type { QuestionType } from "@/features/questions";

type HistoryColumn = QuestionType & { timestamp: Date };

const historyColumns: ColumnDef<HistoryColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "categories",
    header: "Categories",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "timestamp",
    header: "Date Completed",
  },
];

interface HistoryTableProps {
  histories: HistoryColumn[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ histories }) => {
  return <DataTable columns={historyColumns} data={histories} />;
};

export default HistoryTable;
