import { format, isThisWeek, isToday, subDays } from "date-fns";

export const formatDate = ({ date }: { date: string | Date }) => {
  return format(date, "yyyy-MM-dd");
};

export const formatDate2 = (date: Date) => {
  if (isToday(date)) {
    return format(date, "HH:mm");
  } else if (isThisWeek(date)) {
    return format(date, "EEEE p");
  } else {
    return format(date, "MMM d p");
  }
};

export const formatDate3 = (date: Date) => {
  if (isToday(date)) {
    return "Today";
  }
  const sixDaysAgo = subDays(new Date(), 6);
  if (date > sixDaysAgo) {
    return format(date, "EEEE");
  } else {
    return format(date, "dd.MM");
  }
};
