import React from "react";
import ReactApexChart from "react-apexcharts";
import formatDate from "@/libs/dayjs";
import { ChartConfig, Expense, Income, ItemsResponse } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";

type MovementsGraphProps = {
  expensesQuery: UseQueryResult<ItemsResponse<Expense>, Error>;
  incomesQuery: UseQueryResult<ItemsResponse<Income>, Error>;
};

const MovementsGraph = ({
  expensesQuery,
  incomesQuery,
}: MovementsGraphProps) => {
  const chartData = React.useMemo(() => {
    const dates: string[] = [];

    const expensesByDate: { [key: string]: number } = {};

    expensesQuery.data?.data?.forEach((expense) => {
      const formatedDate = formatDate(expense.date);

      dates.push(formatedDate);
      expensesByDate[formatedDate] = expense.amount;
    });

    const incomesByDate: { [key: string]: number } = {};

    incomesQuery.data?.data?.forEach((income) => {
      const formatedDate = formatDate(income.date);

      dates.push(formatedDate);
      incomesByDate[formatedDate] = income.amount;
    });

    // YYYY-MM-DD

    // Remove duplicates dates and sort
    const formatedDates = [...new Set(dates)].sort((a, b) => {
      const splitA = a.split("/");
      const splitB = b.split("/");

      const aDate = new Date(+splitA[2], +splitA[1] - 1, +splitA[0]);
      const bDate = new Date(+splitB[2], +splitB[1] - 1, +splitB[0]);

      return aDate.getTime() - bDate.getTime();
    });

    return {
      labels: formatedDates,
      expensesByDate,
      incomesByDate,
    };
  }, [expensesQuery.data, incomesQuery.data]);

  const lineChartConfig: ChartConfig = {
    series: [
      {
        name: "Gastos",
        data: chartData.labels.map(
          (label) => chartData.expensesByDate[label] || 0
        ),
        color: "#f44336",
      },
      {
        name: "Ingresos",
        data: chartData.labels.map(
          (label) => chartData.incomesByDate[label] || 0
        ),
      },
    ],
    options: {
      title: {
        text: "Movimientos",
      },

      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      labels: chartData.labels,
      dataLabels: {
        enabled: true,
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
    },
    type: "line",
  };

  return <ReactApexChart {...lineChartConfig} />;
};

export default MovementsGraph;
