import { message } from "antd";
import DashboardPageShell from "../../../components/DashboardPageShell";
import IncomeForm from "../components/IncomeForm";
import IncomesTable from "../components/IncomesTable";
import useIncomesMutation from "@/hooks/mutations/useIncomesMutation";
import useModal from "@/hooks/useModal";

const IncomesPage = () => {
  const { open, onToggleOpen } = useModal();

  const mutation = useIncomesMutation({
    extraOnSuccess: () => {
      onToggleOpen();
      message.success("Ingreso agregado exitosamente");
    },
  });

  return (
    <DashboardPageShell
      addItemForm={<IncomeForm onFinish={mutation.mutate} />}
      buttonText="Agregar Ingreso"
      title="Ingresos"
      loading={mutation.isPending}
      onToggleOpenItemForm={onToggleOpen}
      openAddItemForm={Boolean(open)}
    >
      <IncomesTable />
    </DashboardPageShell>
  );
};

export default IncomesPage;
