import { Modal, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Income } from "@/types";
import IncomeForm from "../IncomeForm";
import TableColumnDateFilterIcon from "@/components/Tables/TableColumnDateFilterIcon";
import TableColumnDateFilterInput from "@/components/Tables/TableColumnDateFilterInput";
import TableActionsColumn from "@/components/Tables/TableActionsColumn";
import useAuthStore from "@/store";
import useIncomesQuery from "@/hooks/queries/useIncomesQuery";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import useModal from "@/hooks/useModal";
import useIncomesMutation from "@/hooks/mutations/useIncomesMutation";
import useControlledRangePicker from "@/hooks/useControlledRangePicker";
import useTableFilters from "@/hooks/useTableFilters";
import formatDate from "@/libs/dayjs";

const IncomesTable = () => {
  const { filters, handleTableChange, pageSize } = useTableFilters({});

  const { data: incomes } = useIncomesQuery({ reqParams: filters });
  const { data: currencies } = useCurrenciesQuery();

  const user = useAuthStore((state) => state.data?.user);

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

  const { dateFilterValue, onChange, onReset } = useControlledRangePicker();

  const columns: ColumnsType<Income> = [
    {
      title: "Cantidad",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
      filterIcon: () => {
        return (
          <TableColumnDateFilterIcon
            filterIsActive={
              dateFilterValue ? dateFilterValue?.length > 0 : false
            }
          />
        );
      },
      filterDropdown: (dropdown) => {
        return (
          <TableColumnDateFilterInput
            dropdownProps={dropdown}
            dateFilterValue={dateFilterValue}
            onChange={onChange}
            onReset={onReset}
          />
        );
      },
    },
    {
      title: "Moneda",
      dataIndex: "currencyId",
      key: "currencyId",
      render: (currencyId) => {
        const currency = currencies?.find((c) => c.id === currencyId);
        return <Tag color={"green"}>{currency?.name.toUpperCase()}</Tag>;
      },
      filters: user?.userCurrencies?.map(({ currencyId }) => {
        const currency = currencies?.find((c) => c.id === currencyId);

        return {
          text: currency?.name.toUpperCase(),
          value: currencyId,
        };
      }),
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      render: (_, record) => (
        <TableActionsColumn
          updateModal={updateModal}
          deleteModal={deleteModal}
          deleteMutation={deleteMutation}
          record={record}
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={incomes?.data as Income[] | undefined}
        onChange={handleTableChange}
        pagination={{
          total: incomes?.total,
          current: filters.skip + 1,
          pageSize,
        }}
      />
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
          income={incomes?.data?.find(
            (income) => income.id === updateModal.open
          )}
          onFinish={(update) =>
            updateMutation.mutate({ incomeId: updateModal.open, update })
          }
        />
      </Modal>
    </>
  );
};

export default IncomesTable;
