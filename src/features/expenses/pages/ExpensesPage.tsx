import ExpensesTable from "../components/ExpensesTable";
import AddExpensesForm from "../components/AddExpenseForm";
import DashboardPageShell from "../../../components/DashboardPageShell";
import useExpensesMutation from "@/hooks/mutations/useExpensesMutation";

const ExpensesPage = () => {
  const mutation = useExpensesMutation();

  return (
    <DashboardPageShell
      buttonText="Agregar Gasto"
      addItemForm={<AddExpensesForm onFinish={mutation.mutate} />}
      title="Gastos"
      loading={mutation.isPending}
    >
      <ExpensesTable />
    </DashboardPageShell>
  );
};

export default ExpensesPage;
