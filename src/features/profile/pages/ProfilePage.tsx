import { Typography, Card } from "antd";
import DashboardPageShell from "@/components/DashboardPageShell";
import ProfileForm from "../components/ProfileForm";

export default function ProfilePage() {
  return (
    <DashboardPageShell title="Configuración de Perfil">
      <Card style={{ width: "550px", margin: "0 auto", marginTop: "1rem" }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Edita tus datos
        </Typography.Title>

        <ProfileForm />
      </Card>
    </DashboardPageShell>
  );
}
