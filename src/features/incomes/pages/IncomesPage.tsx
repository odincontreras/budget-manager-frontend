import useIncomesMutation from "@/hooks/mutations/useIncomesMutation";
import DashboardPageShell from "../../../components/DashboardPageShell";
import IncomeForm from "../components/IncomeForm";
import IncomesTable from "../components/IncomesTable";

const IncomesPage = () => {
  const mutation = useIncomesMutation({});

  return (
    <DashboardPageShell
      addItemForm={<IncomeForm onFinish={mutation.mutate} />}
      buttonText="Agregar Ingreso"
      title="Ingresos"
      loading={mutation.isPending}
    >
      <IncomesTable />
    </DashboardPageShell>
  );
};

export default IncomesPage;
