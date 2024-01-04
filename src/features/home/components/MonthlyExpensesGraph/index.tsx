import ReactApexChart from "react-apexcharts";
import { UseQueryResult } from "@tanstack/react-query";
import { getMonthNameFromDate } from "@/libs/dayjs";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { ChartConfig, Expense, ItemsResponse } from "@/types";

type MonthlyExpensesGraphProps = {
  dashboardExpensesQuery: UseQueryResult<ItemsResponse<Expense>, Error>;
};

const MonthlyExpensesGraph = ({
  dashboardExpensesQuery,
}: MonthlyExpensesGraphProps) => {
  const expensesByMonth = dashboardExpensesQuery.data?.data?.reduce(
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
