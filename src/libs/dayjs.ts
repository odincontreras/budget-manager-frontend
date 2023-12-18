import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

function formatDate(date: Date, format = "DD/MM/YYYY") {
  return dayjs(date).format(format);
}

export function getMonthNameFromDate(date: Date) {
  const monthName = dayjs(date).format("MMMM");

  return monthName;
}

export default formatDate;
