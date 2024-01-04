import ReactApexChart from "react-apexcharts";
import { UseQueryResult } from "@tanstack/react-query";
import useCategoriesQuery from "@/hooks/queries/useCategoriesQuery";
import { ChartConfig, Expense, ItemsResponse } from "@/types";

type ExpensesByCategoryProps = {
  dashboardExpensesQuery: UseQueryResult<ItemsResponse<Expense>, Error>;
};

const ExpensesByCategory = ({
  dashboardExpensesQuery,
}: ExpensesByCategoryProps) => {
  const categoriesQuery = useCategoriesQuery();

  const expensesByCategory = dashboardExpensesQuery.data?.data.reduce(
    (acc: { [key: string]: number }, expense) => {
      const categoryId = expense.categoryId;

      acc[categoryId] = (acc[categoryId] || 0) + expense.amount;

      return acc;
    },
    {}
  );

  const categoriesNamesById = categoriesQuery.data?.reduce(
    (acc: { [key: string]: string }, category) => {
      acc[category.id] = category.name;

      return acc;
    },
    {}
  );

  const chartConfig: ChartConfig = {
    series: [
      {
        name: "Gastos",
        type: "column",
        data: Object.values(expensesByCategory ?? {}).map((value) => {
          return value;
        }),
      },
      {
        name: "Meta",
        type: "line",
        data: Object.keys(expensesByCategory ?? {}).map(() => 400),
        color: "#f44336",
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: "Gastos por categoría",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      labels: Object.keys(expensesByCategory ?? {}).map((categoryId) =>
        categoriesNamesById ? categoriesNamesById[categoryId] : ""
      ),
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

export default ExpensesByCategory;
