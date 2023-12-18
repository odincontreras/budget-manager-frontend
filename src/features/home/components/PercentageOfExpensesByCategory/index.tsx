import ReactApexChart from "react-apexcharts";
import { ChartConfig } from "@/types";
import useDashboardExpensesQuery from "@/hooks/queries/useDashboardExpensesQuery";
import useCategoriesQuery from "@/hooks/queries/useCategoriesQuery";

const PercentageOfExpensesByCategory = () => {
  const dashboardExpensesQuery = useDashboardExpensesQuery();
  const categoriesQuery = useCategoriesQuery();

  const expensesByCategory = dashboardExpensesQuery.data?.reduce(
    (acc: { [key: string]: number }, expense) => {
      const categoryId = expense.categoryId;

      acc[categoryId] = (acc[categoryId] || 0) + expense.amount;

      return acc;
    },
    {}
  );

  const dashboardTotalExpenses = dashboardExpensesQuery.data?.reduce(
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
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
          },
        },
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
