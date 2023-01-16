import React from "react";
import { Avatar, Button, Input, Layout, theme } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import config from "../../../env.json";
import { useSelector } from "react-redux";
import { clearToken } from "../../config/services/storage.service";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { authUserSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const logoutUser = () => {
    clearToken();
    navigate("/");
  };
  return (
    <Header
      style={{ background: colorBgContainer }}
      className=" d-flex shadow-sm align-items-center px-3"
    >
      <h5 className="fw-normal w-50 ">
        Hello,
        {` ${authUserSuccess?.user?.surname} ${authUserSuccess?.user?.other_names}`}
      </h5>
      <div className="w-50 d-flex flex-row">
        <Input
          prefix={<AiOutlineUser />}
          size="large"
          placeholder="Search"
          bordered={false}
          value={authUserSuccess?.user?.username}
        />

        <Button onClick={logoutUser} type="text">
          Logout
        </Button>
        <Avatar
          size={"large"}
          src={`${config.IMAGE_BASE_URL}/${authUserSuccess?.user?.avatar}`}
        />
      </div>
    </Header>
  );
};

export default AppHeader;
