import { Layout, Typography, Card, Button } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

const AuthLayout = () => {
  const location = useLocation();
  
  const formTitle =
    location.pathname === "/login" ? "Iniciar Sesion" : "Registrarse";

  const buttonText =
    location.pathname === "/login" ? "Registrarse" : "Iniciar Sesion";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Budget Manager
        </Title>
        <Link to={`/${location.pathname === "/signin" ? "login" : "signin"}`}>
          <Button type="primary">{buttonText}</Button>
        </Link>
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: "450px", margin: "0 auto" }}>
          <Title level={3} style={{ textAlign: "center" }}>
            {formTitle}
          </Title>
          <Outlet />
        </Card>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
