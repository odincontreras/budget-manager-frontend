export default function getMonthWeekFromDate(date: Date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const daysSinceFirstDay = Math.floor(
    (date.getTime() - firstDayOfMonth.getTime()) / (1000 * 60 * 60 * 24)
  );
  const weekNumber = Math.floor(daysSinceFirstDay / 7) + 1; // Add 1 as weeks start from 1
  return weekNumber;
}
