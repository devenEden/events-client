import React, { useEffect } from "react";
import { Layout, theme } from "antd";
import Login from "../containers/auth/Login";
import { getAccessToken } from "../config/services/storage.service";
import { useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const token = getAccessToken();
  const navigate = useNavigate("/");

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-center align-items-center pt-5 ">
        <div
          className="w-50 shadow-sm rounded p-3"
          style={{ background: colorBgContainer }}
        >
          <Login />
        </div>
      </div>
    </Layout>
  );
};

export default AuthLayout;
