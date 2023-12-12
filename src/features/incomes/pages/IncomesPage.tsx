import useIncomesMutation from "@/hooks/mutations/useIncomesMutation";
import DashboardPageShell from "../../../components/DashboardPageShell";
import AddIncomeForm from "../components/AddIncomeForm";
import IncomesTable from "../components/IncomesTable";

const IncomesPage = () => {
  const mutation = useIncomesMutation();

  return (
    <DashboardPageShell
      addItemForm={<AddIncomeForm onFinish={mutation.mutate} />}
      buttonText="Agregar Ingreso"
      title="Ingresos"
      loading={mutation.isPending}
    >
      <IncomesTable />
    </DashboardPageShell>
  );
};

export default IncomesPage;
