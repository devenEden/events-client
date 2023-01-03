import React, { createElement, useState } from "react";
import {
  AiOutlineBank,
  AiOutlineCalendar,
  AiOutlineDesktop,
  AiOutlineEnvironment,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import { Layout, Menu, Typography } from "antd";
import routes from "../../config/routing/routes";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

const AppSider = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const menuItems = routes.internalRoutes.children
    .filter((i) => i.is_on_menu)
    .map((item) => {
      return getItem(
        item.label,
        item.path,
        createElement(item.icon, {
          style: { fontSize: "1.5rem", marginLeft: -5 },
        }),
        null,
        () => navigate(item.path)
      );
    });
  return (
    <Sider
      collapsible
      theme="light"
      className="shadow-sm overflow-hidden"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="fw-normal flex-column d-flex justify-content-start align-items-center">
        <h3 className="display-5">
          <AiOutlineEnvironment />
        </h3>
        {!collapsed && (
          <Typography.Title className="text-white" level={3}>
            Event Manager
          </Typography.Title>
        )}
      </div>
      <div className="d-flex align-items-center h-50 overflow-hidden">
        <Menu theme="light" mode="inline" items={menuItems} />
      </div>
    </Sider>
  );
};

export default AppSider;
