import { Card, Flex, Progress, Typography } from "antd";
import { Line } from "@ant-design/plots";
import useTotalExpensesQuery from "@/hooks/queries/useTotalExpensesQuery";
import useTotalIncomesQuery from "@/hooks/queries/useTotalIncomesQuery";
import useDashboardExpensesQuery from "@/hooks/queries/useDashboardExpensesQuery";
import useDashboardIncomesQuery from "@/hooks/queries/useDashboardIncomesQuery";
import formatDate from "@/libs/dayjs";
import { useMemo } from "react";

type Movement = {
  date: string;
  amount: number;
  type: "Ingreso" | "Gasto";
};

const TotalMovements = () => {
  const totalExpensesQuery = useTotalExpensesQuery();
  const totalIncomesQuery = useTotalIncomesQuery();
  const dashboardExpensesQuery = useDashboardExpensesQuery();
  const dashboardIncomesQuery = useDashboardIncomesQuery();

  const totalIncomesAmount = totalIncomesQuery.data?.amount;
  const totalExpensesAmount = totalExpensesQuery.data?.amount;

  const balance =
    totalIncomesAmount && totalExpensesAmount
      ? totalIncomesAmount - totalExpensesAmount
      : 0;

  const movements = useMemo(() => {
    const movements: Movement[] = [];

    const movementsDates = dashboardIncomesQuery.data
      ? dashboardIncomesQuery.data
          .map((income) => income.date)
          .concat(
            dashboardExpensesQuery.data
              ? dashboardExpensesQuery.data.map((expense) => expense.date)
              : []
          )
      : [];

    for (const date of movementsDates) {
      if (dashboardIncomesQuery.data) {
        const incomesFromDate = dashboardIncomesQuery.data.filter(
          (income) => income.date === date
        );

        if (incomesFromDate.length > 0) {
          movements.concat(
            incomesFromDate.map((income) => ({
              date: formatDate(income.date),
              amount: income.amount,
              type: "Ingreso",
            }))
          );
        } else {
          movements.push({
            date: formatDate(date),
            amount: 0,
            type: "Ingreso",
          });
        }
      }

      if (dashboardExpensesQuery.data) {
        const expensesFromDate = dashboardExpensesQuery.data.filter(
          (expense) => expense.date === date
        );

        if (expensesFromDate.length > 0) {
          movements.concat(
            expensesFromDate.map((expense) => ({
              date: formatDate(expense.date),
              amount: expense.amount,
              type: "Gasto",
            }))
          );
        } else {
          movements.push({
            date: formatDate(date),
            amount: 0,
            type: "Gasto",
          });
        }
      }
    }

    return movements;
  }, [dashboardExpensesQuery.data, dashboardIncomesQuery.data]);

  return (
    <>
      <Card>
        <Typography.Text strong style={{ display: "block" }}>
          Ingresos Totales
        </Typography.Text>
        <Typography.Text>{totalIncomesAmount}</Typography.Text>

        <Flex gap={"2.5rem"}>
          <Flex gap={"1rem"} align="center">
            <div>
              <Typography.Text strong style={{ display: "block" }}>
                Gastos Totales
              </Typography.Text>
              <Typography.Text style={{ display: "block" }}>
                {totalExpensesAmount}
              </Typography.Text>
            </div>

            <Progress
              type="circle"
              size={55}
              percent={
                totalIncomesAmount && totalExpensesAmount
                  ? Number(
                      (
                        (totalExpensesAmount * 100) /
                        totalIncomesAmount
                      ).toFixed(0)
                    )
                  : 0
              }
            />
          </Flex>

          <Flex gap={"1rem"} align="center">
            <div>
              <Typography.Text strong style={{ display: "block" }}>
                Balance
              </Typography.Text>
              <Typography.Text style={{ display: "block" }}>
                {balance ? balance : 0}
              </Typography.Text>
            </div>

            <Progress
              type="circle"
              size={55}
              percent={
                balance && totalIncomesAmount
                  ? Number(((balance * 100) / totalIncomesAmount).toFixed(0))
                  : 0
              }
            />
          </Flex>
        </Flex>
      </Card>

      <Card>
        <Line
          data={movements}
          xField={"date"}
          yField={"amount"}
          // axis={{
          //   x: {
          //     labelFormatter: (v: Date) => {
          //       return formatDate(v);
          //     },
          //   },
          // }}
          colorField="type"
          shapeField="smooth"
          style={{
            lineWidth: 2,
          }}
          tooltip={{
            title: (v) => {
              return formatDate(v.date);
            },
            items: [{ channel: "y" }],
          }}
          point={{
            shapeField: "diamond",
            sizeField: 4,
          }}
        />
      </Card>
    </>
  );
};

export default TotalMovements;
