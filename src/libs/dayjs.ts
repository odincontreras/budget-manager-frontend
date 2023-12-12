import dayjs from "dayjs";

function formatDate(date: Date) {
  return dayjs(date).format("DD/MM/YYYY");
}

export default formatDate;
