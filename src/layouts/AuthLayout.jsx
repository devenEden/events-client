import React, { useEffect } from "react";
import { theme } from "antd";
import { Outlet } from "react-router-dom";
import { getAccessToken } from "../config/services/storage.service";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import Image2 from "../assets/logo.png";

const AuthLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const token = getAccessToken();
  const navigate = useNavigate("/");

  useEffect(() => {
    if (token) navigate("/events");
  }, [token]);
  return (
    <div
      className="auth-row"
      style={{
        backgroundColor: colorBgContainer,
        minHeight: "100vh",
      }}
    >
      <div className="left-col">
        <div className="left-container">
          <div className="img-container">
            <Image className="rounded-2" src={Image2} />
          </div>
        </div>
      </div>
      <div className="right-col">
        <div className="right-container">
          <div className="form-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
