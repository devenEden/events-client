import React, { useEffect } from "react";
import { Layout } from "antd";
import AppHeader from "../components/shared/AppHeader";
import AppFooter from "../components/shared/AppFooter";
import { Outlet, useNavigate } from "react-router-dom";
import AppSider from "../components/shared/AppSider";
import { getAccessToken } from "../config/services/storage.service";
const MainLayout = () => {
  const token = getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/auth");
  }, [token]);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <AppSider />
      <Layout className="site-layout">
        <AppHeader />
        <Outlet />
        <AppFooter />
      </Layout>
    </Layout>
  );
};
export default MainLayout;
