import React, { useEffect } from "react";
import { theme } from "antd";
import { Outlet } from "react-router-dom";
import { getAccessToken } from "../config/services/storage.service";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import Image2 from "../assets/Auth.svg";

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
    <div
      className="d-flex "
      style={{
        backgroundColor: colorBgContainer,
        minHeight: "100vh",
      }}
    >
      <div className="left-col d-none d-md-block w-50 h-100">
        <div className=" d-md-flex justify-content-center align-items-center">
          <Image
            height={500}
            width={500}
            preview={false}
            className="rounded-2 mt-5"
            src={Image2}
          />
        </div>
      </div>
      <div className="right-col w-50 w-sm-100">
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
