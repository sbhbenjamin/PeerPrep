"use client";

import { BookMarked, Link, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

import { renderRelativeTime } from "@/utils/date";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { selectAuthData } from "@/features/auth";
import { CategoryBadge } from "@/features/questions";
import type { History } from "@/features/users";
import { EditUserProfileForm } from "@/features/users";

import { useGetHistoryQuery } from "@/services/historyApi";
import { useGetUserByIdQuery } from "@/services/userApi";

const page = ({ params }: { params: { id: number } }) => {
  const auth = useSelector(selectAuthData);
  const { data: user, isLoading, isError } = useGetUserByIdQuery(params.id);
  const {
    data: history,
    isLoading: isGetHistoryLoading,
    isError: isGetHistoryError,
  } = useGetHistoryQuery({ userId: params.id });

  if (isError) {
    throw new Error("User not found");
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  const handleClickHistoryRow = () => {
    // nav to session
  };

  return (
    <div className="w-full max-w-screen-xl break-words">
      <div className="flex h-96 w-full gap-x-8">
        <Card className="max-w-[25%] grow items-start">
          <CardContent className="flex flex-col items-start gap-4 p-5">
            <div className="flex w-full flex-row items-center justify-start gap-6">
              <h1 className="text-lg">{user?.name}</h1>
              {auth.currentUser && auth.currentUser.email === user!.email ? (
                <EditUserProfileForm userId={params.id} />
              ) : null}
            </div>
            <Separator className="mb-3" />
            <div className="mb-3 flex flex-col gap-5">
              <div className="flex flex-row gap-3">
                <Link href="#/" />
                {user?.url ? (
                  <a href={user?.url} target="_blank" rel="noopener noreferrer">
                    {user?.url}
                  </a>
                ) : (
                  <p>User has yet to provide a url</p>
                )}
              </div>

              <div className="mb-3 flex gap-3">
                <BookMarked />
                <p>{user?.bio || "User has yet to provide a bio"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grow-[8]">
          <h2 className="mb-4 text-2xl font-bold">History</h2>
          {isGetHistoryLoading && (
            <div className="flex justify-center">
              <Loader2 className="mr-2 animate-spin" />
            </div>
          )}

          <Card className="w-full">
            <Table>
              <TableCaption>A list of recent questions solved.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history &&
                  history.map(({ id, timestamp, question }: History) => (
                    <TableRow key={id} onClick={handleClickHistoryRow}>
                      <TableCell className="font-medium">
                        {renderRelativeTime(new Date(timestamp))}
                      </TableCell>
                      <TableCell>{question.title}</TableCell>
                      <TableCell>
                        <CategoryBadge categories={question.categories} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            <CardContent />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
