import { Modal, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Expense } from "@/types";
import ExpenseForm from "../ExpenseForm";
import TableActionsColumn from "@/components/Tables/TableActionsColumn";
import TableColumnDateFilterIcon from "@/components/Tables/TableColumnDateFilterIcon";
import TableColumnDateFilterInput from "@/components/Tables/TableColumnDateFilterInput";
import useAuthStore from "@/store";
import useCurrenciesQuery from "@/hooks/queries/useCurrenciesQuery";
import useExpensesQuery from "@/hooks/queries/useExpensesQuery";
import useExpensesMutation from "@/hooks/mutations/useExpensesMutation";
import useCategoriesQuery from "@/hooks/queries/useCategoriesQuery";
import useModal from "@/hooks/useModal";
import useTableFilters from "@/hooks/useTableFilters";
import useControlledRangePicker from "@/hooks/useControlledRangePicker";
import formatDate from "@/libs/dayjs";

const ExpensesTable = () => {
  const { filters, handleTableChange, pageSize } = useTableFilters({});

  const expensesQuery = useExpensesQuery(filters);
  const currenciesQuery = useCurrenciesQuery();
  const categoriesQuery = useCategoriesQuery();

  const user = useAuthStore((state) => state.data?.user);

  const { dateFilterValue, onChange, onReset } = useControlledRangePicker();

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
      sorter: true,
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      defaultSortOrder: "descend",
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
        const currency = currenciesQuery?.data?.find(
          (c) => c.id === currencyId
        );
        return <Tag color={"green"}>{currency?.name.toUpperCase()}</Tag>;
      },
      filters: user?.userCurrencies?.map(({ currencyId }) => {
        const currency = currenciesQuery?.data?.find(
          (c) => c.id === currencyId
        );

        return {
          text: currency?.name.toUpperCase(),
          value: currencyId,
        };
      }),
    },
    {
      title: "Categoría",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) => {
        const category = categoriesQuery?.data?.find(
          (c) => c.id === categoryId
        );
        return <Tag color={"green"}>{category?.name.toUpperCase()}</Tag>;
      },
      filters: categoriesQuery?.data?.map((category) => ({
        text: category.name.toUpperCase(),
        value: category.id,
      })),
    },
    {
      title: "Acciones",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <TableActionsColumn
            updateModal={updateModal}
            deleteModal={deleteModal}
            deleteMutation={deleteMutation}
            record={record}
          />
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={expensesQuery.data?.data}
        onChange={handleTableChange}
        pagination={{
          total: expensesQuery?.data?.total,
          current: filters?.skip ? filters.skip + 1 : 1,
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
        <ExpenseForm
          action="update"
          expense={expensesQuery.data?.data?.find(
            (e) => e.id === updateModal.open
          )}
          onFinish={(update) =>
            updateMutation.mutate({ expenseId: updateModal.open, update })
          }
        />
      </Modal>
    </>
  );
};

export default ExpensesTable;
