import useAuthStore from "@/store";
import { Layout, Spin } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type VerifyTokenProps = {
  children: React.ReactNode;
};

const VerifyToken = ({ children }: VerifyTokenProps): React.ReactNode => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const verifyToken = useAuthStore((state) => state.verifyToken);
  const authToken = localStorage.getItem("bugget-manager-auth-token");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthenticated && authToken) {
      verifyToken({ navigate, pathname, authToken });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated || !authToken) return children;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Content style={{ display: "grid", placeItems: "center" }}>
        <Spin size="large" />
      </Layout.Content>
    </Layout>
  );
};

export default VerifyToken;
