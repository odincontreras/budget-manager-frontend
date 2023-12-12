import { Layout, Menu, Typography, theme, Button } from "antd";
import {
  HomeOutlined,
  FallOutlined,
  RiseOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "home", <HomeOutlined />),
  getItem("Incomes", "incomes", <RiseOutlined />),
  getItem("Expenses", "expenses", <FallOutlined />),
  getItem("Profile", "profile", <UserOutlined />),
];

const DashboardLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const menuClickHandler: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "home":
        return navigate("/dashboard");
      case "incomes":
        return navigate("/dashboard/incomes");
      case "expenses":
        return navigate("/dashboard/expenses");
      case "profile":
        return navigate("/dashboard/profile");
      default:
        return;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark">
        <Menu
          onClick={menuClickHandler}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          color="#99f6dd"
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Title level={2} color="white" style={{ margin: 0 }}>
            Budget Manager
          </Typography.Title>

          <Button
            type="text"
            icon={<PoweroffOutlined style={{ fontSize: "20px" }} />}
            onClick={() => navigate("/login")}
            shape="circle"
            size="large"
          />
        </Header>
        <Content style={{ margin: "2rem" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              height: "100%",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
