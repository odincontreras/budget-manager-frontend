import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import useExpensesQuery from "@/hooks/queries/useExpensesQuery";
import formatDate from "@/libs/dayjs";
import { Expense } from "@/types";

const ExpensesTable = () => {
  const expensesQuery = useExpensesQuery();
  const currenciesQuery = useCurrenciesQuery();

  const columns: ColumnsType<Expense> = [
    {
      title: "Cantidad",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
    {
      title: "Moneda",
      dataIndex: "currencyId",
      key: "currencyId",
      render: (currencyId) => {
        const currency = currenciesQuery?.data?.find(
          (c) => c.id === currencyId
        );
        return <Tag color={"green"}>{currency?.name.toUpperCase()}</Tag>;
      },
    },
  ];

  return <Table columns={columns} dataSource={expensesQuery.data} />;
};

export default ExpensesTable;
