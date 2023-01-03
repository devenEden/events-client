import React from "react";
import { Button, Input, Layout, theme } from "antd";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";

const { Header } = Layout;

const AppHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      style={{ background: colorBgContainer }}
      className="border-bottom-secondary d-flex align-items-center px-3"
    >
      <h5 className="fw-normal w-50 ">Hello, Feta Deven </h5>
      <div className="w-50 d-flex flex-row">
        <Input
          prefix={<AiOutlineSearch />}
          size="large"
          placeholder="Search"
          bordered={false}
        />
        <Button
          type="text"
          className="border mx-1 d-flex align-items-center h-100"
        >
          <h5>
            <AiOutlineUser />
          </h5>
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
