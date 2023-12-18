import { Modal, Popconfirm, Space, Table, Tag, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import IconButton from "@/components/IconButton";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import useExpensesQuery from "@/hooks/queries/useExpensesQuery";
import useExpensesMutation from "@/hooks/mutations/useExpensesMutation";
import useModal from "@/hooks/useModal";
import formatDate from "@/libs/dayjs";
import { Expense } from "@/types";
import ExpenseForm from "../ExpenseForm";

const ExpensesTable = () => {
  const expensesQuery = useExpensesQuery();
  const currenciesQuery = useCurrenciesQuery();

  const deleteModal = useModal();
  const updateModal = useModal();

  const deleteMutation = useExpensesMutation({
    action: "delete",
    extraOnSuccess: () => {
      deleteModal.onToggleOpen();
      message.success("Gasto eliminado exitosamente");
    },
  });

  const updateMutation = useExpensesMutation({
    action: "update",
    extraOnSuccess: () => {
      updateModal.onToggleOpen();
      message.success("Gasto actualizado exitosamente");
    },
  });

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
    {
      title: "Acciones",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <Space size={"middle"}>
            <IconButton
              title="Editar"
              icon={<EditOutlined />}
              buttonProps={{ onClick: () => updateModal.onSetOpen(record.id) }}
            />
            <Popconfirm
              title="Alerta"
              description="¿Está seguro de que desea eliminar este gasto?"
              cancelText="Cancelar"
              okText="Eliminar"
              open={deleteModal.open === record.id}
              onConfirm={() => {
                deleteMutation.mutate(record.id);
              }}
              onCancel={deleteModal.onToggleOpen}
              okButtonProps={{ loading: deleteMutation.isPending }}
            >
              <IconButton
                title="Eliminar"
                icon={<DeleteOutlined />}
                buttonProps={{
                  onClick: () => deleteModal.onSetOpen(record.id),
                }}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={expensesQuery.data} />

      <Modal
        open={Boolean(updateModal.open)}
        onCancel={updateModal.onToggleOpen}
        okButtonProps={{
          htmlType: "submit",
          form: "modal-form",
          loading: updateMutation.isPending,
        }}
        title={"Editar Gasto"}
        destroyOnClose
      >
        <ExpenseForm
          action="update"
          expense={expensesQuery.data?.find((e) => e.id === updateModal.open)}
          onFinish={(update) =>
            updateMutation.mutate({ expenseId: updateModal.open, update })
          }
        />
      </Modal>
    </>
  );
};

export default ExpensesTable;
