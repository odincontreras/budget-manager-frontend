import { Modal, Popconfirm, Space, Table, Tag, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import IconButton from "@/components/IconButton";
import useIncomesQuery from "@/hooks/queries/useIncomesQuery";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import useModal from "@/hooks/useModal";
import { Income } from "@/types";
import formatDate from "@/libs/dayjs";
import useIncomesMutation from "@/hooks/mutations/useIncomesMutation";
import IncomeForm from "../IncomeForm";

const IncomesTable = () => {
  const { data: incomes } = useIncomesQuery();
  const { data: currencies } = useCurrenciesQuery();

  const deleteModal = useModal();
  const updateModal = useModal();

  const deleteMutation = useIncomesMutation({
    action: "delete",
    extraOnSuccess: () => {
      deleteModal.onToggleOpen();
      message.success("Ingreso eliminado exitosamente");
    },
  });

  const updateMutation = useIncomesMutation({
    action: "update",
    extraOnSuccess: () => {
      updateModal.onToggleOpen();
      message.success("Ingreso actualizado exitosamente");
    },
  });

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
    {
      title: "Acciones",
      dataIndex: "actions",
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
              description="¿Está seguro de que desea eliminar este ingreso?"
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
      <Table columns={columns} dataSource={incomes as Income[] | undefined} />
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
        <IncomeForm
          action="update"
          income={incomes?.find((income) => income.id === updateModal.open)}
          onFinish={(update) =>
            updateMutation.mutate({ incomeId: updateModal.open, update })
          }
        />
      </Modal>
    </>
  );
};

export default IncomesTable;
