import { useSelector } from "react-redux";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { selectAuthData } from "@/features/auth";
import type { User } from "@/features/users";

import { useGetHistoryQuery } from "@/services/historyApi";

type WeekRange = {
  startOfWeek: Date;
  endOfWeek: Date;
};

const getStartAndEndDateOfWeek = (date: Date = new Date()): WeekRange => {
  const currentDayOfWeek = date.getDay();
  const diffToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() + diffToMonday);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return {
    startOfWeek,
    endOfWeek,
  };
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

interface WeeklySummaryCardProps {
  user?: User;
}

export const WeeklySummaryCard: React.FC<WeeklySummaryCardProps> = ({
  user,
}) => {
  const currUser = useSelector(selectAuthData);
  const dateRange = getStartAndEndDateOfWeek();
  const startDate = dateFormatter.format(dateRange.startOfWeek);
  const endDate = dateFormatter.format(dateRange.endOfWeek);
  const {
    data: history,
    isLoading: isGetHistoryLoading,
    isError: isGetHistoryError,
  } = useGetHistoryQuery({
    userId: currUser.currentUser?.id,
    startDate: dateRange.startOfWeek.toISOString(),
    endDate: dateRange.endOfWeek.toISOString(),
  });
  const historyCount = history?.length ?? 0;

  return (
    <Card className="flex min-w-[33%] gap-6">
      <CardHeader>
        <CardTitle>
          <p className="text-xl">Completed This Week</p>
        </CardTitle>
        <p className="text-3xl font-semibold">{historyCount} Interviews</p>
        <div>
          {startDate} - {endDate}
        </div>
      </CardHeader>
    </Card>
  );
};
