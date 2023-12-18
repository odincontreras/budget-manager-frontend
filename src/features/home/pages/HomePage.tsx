import { Card, Col, Row } from "antd";
import TotalMovements from "../components/TotalMovements";
import MovementsGraph from "../components/MovementsGraph";
import WeeklyExpensesGraph from "../components/WeeklyExpensesGraph";
import MonthlyExpensesGraph from "../components/MonthlyExpensesGraph";
import PercentageOfExpensesByCategory from "../components/PercentageOfExpensesByCategory";
import ExpensesByCategory from "../components/ExpensesByCategory";

const HomePage = () => {
  return (
    <>
      <TotalMovements />
      <Card>
        <MovementsGraph />
      </Card>

      <Row gutter={22}>
        <Col span={12}>
          <Card>
            <MonthlyExpensesGraph />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <WeeklyExpensesGraph />
          </Card>
        </Col>
      </Row>

      <Row gutter={22}>
        <Col span={12}>
          <Card>
            <PercentageOfExpensesByCategory />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <ExpensesByCategory />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
