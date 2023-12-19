import { message } from "antd";
import ExpensesTable from "../components/ExpensesTable";
import ExpenseForm from "../components/ExpenseForm";
import DashboardPageShell from "../../../components/DashboardPageShell";
import useExpensesMutation from "@/hooks/mutations/useExpensesMutation";
import useModal from "@/hooks/useModal";

const ExpensesPage = () => {
  const { open, onToggleOpen } = useModal();

  const mutation = useExpensesMutation({
    extraOnSuccess: () => {
      onToggleOpen();
      message.success("Gasto agregado exitosamente");
    },
  });

  return (
    <DashboardPageShell
      buttonText="Agregar Gasto"
      addItemForm={<ExpenseForm onFinish={mutation.mutate} />}
      title="Gastos"
      loading={mutation.isPending}
      onToggleOpenItemForm={onToggleOpen}
      openAddItemForm={Boolean(open)}
    >
      <ExpensesTable />
    </DashboardPageShell>
  );
};

export default ExpensesPage;
