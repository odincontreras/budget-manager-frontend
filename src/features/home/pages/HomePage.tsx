import { Card, Col, Row, Space } from "antd";
import TotalMovements from "../components/TotalMovements";
import MovementsGraph from "../components/MovementsGraph";
import WeeklyExpensesGraph from "../components/WeeklyExpensesGraph";
import MonthlyExpensesGraph from "../components/MonthlyExpensesGraph";
import PercentageOfExpensesByCategory from "../components/PercentageOfExpensesByCategory";
import ExpensesByCategory from "../components/ExpensesByCategory";
import DashboardFilters from "../components/DashboardFilters";
import useDashboardFilters from "../../../hooks/useDashboardFilters";
import useExpensesQuery from "@/hooks/queries/useExpensesQuery";
import useIncomesQuery from "@/hooks/queries/useIncomesQuery";

const HomePage = () => {
  const { filters, onUpdateFilters } = useDashboardFilters();

  const expensesQuery = useExpensesQuery({ filters });
  const incomesQuery = useIncomesQuery({ filters });

  return (
    <>
      <DashboardFilters onUpdateFilters={onUpdateFilters} filters={filters} />

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <TotalMovements currencyId={filters?.currencyId} />

        <Card>
          <div
            style={{
              margin: "0 auto",
              display: "block",
              width: "85%",
            }}
          >
            <MovementsGraph
              expensesQuery={expensesQuery}
              incomesQuery={incomesQuery}
            />
          </div>
        </Card>

        <Row gutter={22}>
          <Col span={12}>
            <Card>
              <MonthlyExpensesGraph dashboardExpensesQuery={expensesQuery} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <WeeklyExpensesGraph dashboardExpensesQuery={expensesQuery} />
            </Card>
          </Col>
        </Row>

        <Row gutter={22}>
          <Col span={12}>
            <Card>
              <PercentageOfExpensesByCategory
                dashboardExpensesQuery={expensesQuery}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ height: "100%" }}>
              <ExpensesByCategory dashboardExpensesQuery={expensesQuery} />
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default HomePage;
