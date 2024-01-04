import { Card, Col, Row } from "antd";
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

      <TotalMovements currencyId={filters?.currencyId} />

      <Card>
        <MovementsGraph
          expensesQuery={expensesQuery}
          incomesQuery={incomesQuery}
        />
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
          <Card>
            <ExpensesByCategory dashboardExpensesQuery={expensesQuery} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
