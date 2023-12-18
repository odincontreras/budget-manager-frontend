import ReactApexChart from "react-apexcharts";
import useDashboardExpensesQuery from "@/hooks/queries/useDashboardExpensesQuery";
import { getMonthNameFromDate } from "@/libs/dayjs";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { ChartConfig } from "@/types";

const MonthlyExpensesGraph = () => {
  const dashboardExpensesQuery = useDashboardExpensesQuery();

  const expensesByMonth = dashboardExpensesQuery.data?.reduce(
    (acc: Map<string, number>, expense) => {
      const expenseMonth = getMonthNameFromDate(expense.date);

      acc.set(expenseMonth, (acc.get(expenseMonth) || 0) + expense.amount);

      return acc;
    },
    new Map()
  );

  const expensesMonths = Array.from(expensesByMonth?.keys() ?? []);

  const chartConfig: ChartConfig = {
    series: [
      {
        name: "Gastos",
        type: "column",
        data: Array.from(expensesByMonth?.values() ?? []).map((value) => {
          return value;
        }),
      },
      {
        name: "Meta",
        type: "line",
        data: expensesMonths.map(() => 400),
        color: "#f44336",
      },
    ],
    options: {
      title: {
        text: "Gastos por mes",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      labels: expensesMonths.map((month) => capitalizeFirstLetter(month)),
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

export default MonthlyExpensesGraph;
