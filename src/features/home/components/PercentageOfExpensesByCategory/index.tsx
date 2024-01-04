import ReactApexChart from "react-apexcharts";
import { UseQueryResult } from "@tanstack/react-query";
import { ChartConfig, Expense, ItemsResponse } from "@/types";
import useCategoriesQuery from "@/hooks/queries/useCategoriesQuery";

type PercentageOfExpensesByCategoryProps = {
  dashboardExpensesQuery: UseQueryResult<ItemsResponse<Expense>, Error>;
};

const PercentageOfExpensesByCategory = ({
  dashboardExpensesQuery,
}: PercentageOfExpensesByCategoryProps) => {
  const categoriesQuery = useCategoriesQuery();

  const expensesByCategory = dashboardExpensesQuery.data?.data?.reduce(
    (acc: { [key: string]: number }, expense) => {
      const categoryId = expense.categoryId;

      acc[categoryId] = (acc[categoryId] || 0) + expense.amount;

      return acc;
    },
    {}
  );

  const dashboardTotalExpenses = dashboardExpensesQuery.data?.data?.reduce(
    (acc: number, expense) => {
      return acc + expense.amount;
    },
    0
  );

  const categoriesNamesById = categoriesQuery.data?.reduce(
    (acc: { [key: string]: string }, category) => {
      acc[category.id] = category.name;

      return acc;
    },
    {}
  );

  const radialChartConfig: ChartConfig = {
    series: Object.values(expensesByCategory ?? {}).map((value) =>
      Number(((value * 100) / (dashboardTotalExpenses ?? 0)).toFixed(0))
    ),
    options: {
      title: {
        text: "Porcentaje de gastos por categoría",
      },
      chart: {
        type: "radialBar",
      },
      legend: {
        show: true,
        position: "left",
        offsetX: -30,
        offsetY: 10,
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
        },
      },
      labels: Object.keys(expensesByCategory ?? {}).map((categoryId) =>
        categoriesNamesById ? categoriesNamesById[categoryId] : ""
      ),
    },
    type: "radialBar",
  };

  return <ReactApexChart {...radialChartConfig} />;
};

export default PercentageOfExpensesByCategory;
