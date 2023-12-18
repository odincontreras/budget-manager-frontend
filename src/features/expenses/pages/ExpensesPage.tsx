import ExpensesTable from "../components/ExpensesTable";
import ExpenseForm from "../components/ExpenseForm";
import DashboardPageShell from "../../../components/DashboardPageShell";
import useExpensesMutation from "@/hooks/mutations/useExpensesMutation";

const ExpensesPage = () => {
  const mutation = useExpensesMutation({});

  return (
    <DashboardPageShell
      buttonText="Agregar Gasto"
      addItemForm={<ExpenseForm onFinish={mutation.mutate} />}
      title="Gastos"
      loading={mutation.isPending}
    >
      <ExpensesTable />
    </DashboardPageShell>
  );
};

export default ExpensesPage;
