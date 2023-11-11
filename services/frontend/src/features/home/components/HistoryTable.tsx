import { ArrowUpDown } from "lucide-react";
import React from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";

import type { QuestionType } from "@/features/questions";
import type { History } from "@/features/users";

type HistoryColumn = QuestionType & { timestamp: Date };

export const historyColumn: ColumnDef<HistoryColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const categories: string[] = row.getValue("categories");
      return (
        <div className="flex w-60 flex-row flex-wrap gap-x-2">
          {categories.map((cat) => (
            <p key={cat}>{cat}</p>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const order: { [key: string]: number } = { Hard: 3, Medium: 2, Easy: 1 }; // Define the order for sorting
      const difficultyA = rowA.getValue("difficulty") as keyof typeof order;
      const difficultyB = rowB.getValue("difficulty") as keyof typeof order;
      return order[difficultyB] - order[difficultyA]; // Sort based on the defined order
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Completed
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date = new Date(row.getValue("timestamp"));
      return <p>{date.getDate()}</p>;
    },
    sortingFn: (rowA, rowB) => {
      const dateA = rowA.getValue("timestamp") as Date;
      const dateB = rowB.getValue("timestamp") as Date;
      return dateA.getTime() - dateB.getTime();
    },
    enableSorting: true,
  },
];

interface HistoryTableProps {
  histories: History[];
}

function formatHistory(history: History): HistoryColumn {
  return {
    ...history.question,
    timestamp: history.timestamp,
  };
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ histories }) => {
  return (
    <DataTable
      placeholder="Search by tile"
      filterBy="title"
      columns={historyColumn}
      data={histories.map((history) => formatHistory(history))}
    />
  );
};
