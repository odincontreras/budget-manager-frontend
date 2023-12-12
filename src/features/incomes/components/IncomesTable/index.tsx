import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import useIncomesQuery from "@/hooks/queries/useIncomesQuery";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import { Income } from "@/types";
import formatDate from "@/libs/dayjs";

const IncomesTable = () => {
  const { data: incomes } = useIncomesQuery();
  const { data: currencies } = useCurrenciesQuery();

  const columns: ColumnsType<Income> = [
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
        const currency = currencies?.find((c) => c.id === currencyId);
        return <Tag color={"green"}>{currency?.name.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <Table columns={columns} dataSource={incomes as Income[] | undefined} />
  );
};

export default IncomesTable;
