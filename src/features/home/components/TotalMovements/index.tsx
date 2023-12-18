import { Card, Flex, Progress, Typography } from "antd";
import useTotalExpensesQuery from "@/hooks/queries/useTotalExpensesQuery";
import useTotalIncomesQuery from "@/hooks/queries/useTotalIncomesQuery";

const TotalMovements = () => {
  const totalExpensesQuery = useTotalExpensesQuery();
  const totalIncomesQuery = useTotalIncomesQuery();

  const totalIncomesAmount = totalIncomesQuery.data?.amount;
  const totalExpensesAmount = totalExpensesQuery.data?.amount;

  const balance =
    totalIncomesAmount && totalExpensesAmount
      ? totalIncomesAmount - totalExpensesAmount
      : 0;

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
    </>
  );
};

export default TotalMovements;
