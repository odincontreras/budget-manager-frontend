import ReactApexChart from "react-apexcharts";
import useDashboardExpensesQuery from "@/hooks/queries/useDashboardExpensesQuery";
import { getMonthNameFromDate } from "@/libs/dayjs";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import getMonthWeekFromDate from "@/utils/getMonthWeekFromDate";
import { ChartConfig } from "@/types";

const WeeklyExpensesGraph = () => {
  const dashboardExpensesQuery = useDashboardExpensesQuery();

  const expensesByWeek = dashboardExpensesQuery.data?.reduce(
    (acc: Map<string, number>, expense) => {
      const monthName = getMonthNameFromDate(expense.date);
      const weekDate = getMonthWeekFromDate(new Date(expense.date));

      const key = `Sem ${weekDate} - ${monthName}`;

      acc.set(key, (acc.get(key) || 0) + expense.amount);

      return acc;
    },
    new Map()
  );

  const expensesWeeks = Array.from(expensesByWeek?.keys() ?? []);

  const chartConfig: ChartConfig = {
    series: [
      {
        name: "Gastos",
        type: "column",
        data: Array.from(expensesByWeek?.values() ?? []).map((value) => {
          return value;
        }),
      },
      {
        name: "Meta",
        type: "line",
        data: expensesWeeks.map(() => 400),
        color: "#f44336",
      },
    ],
    options: {
      title: {
        text: "Gastos por semana",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      labels: expensesWeeks.map((week) => capitalizeFirstLetter(week)),
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
    },
    type: "line",
  };

  return <ReactApexChart {...chartConfig} />;
};

export default WeeklyExpensesGraph;
