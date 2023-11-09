import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import type { User } from "@/features/users";

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
  const dateRange = getStartAndEndDateOfWeek();
  const startDate = dateFormatter.format(dateRange.startOfWeek);
  const endDate = dateFormatter.format(dateRange.endOfWeek);

  return (
    <Card className="flex min-w-[33%] gap-6">
      <CardHeader>
        <CardTitle>
          <p className="text-xl">Completed This Week</p>
        </CardTitle>
        <p className="text-3xl font-semibold">5 Interviews</p>
        <div>
          {startDate} - {endDate}
        </div>
      </CardHeader>
    </Card>
  );
};
