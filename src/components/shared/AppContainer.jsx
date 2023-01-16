import React from "react";
import { Layout, notification, Typography } from "antd";
import PropTypes from "prop-types";
import AppSider from "./AppSider";
import AppHeader from "./AppHeader";
import { getAccessToken } from "../../config/services/storage.service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
// import { useLocation } from "react-router-dom";
const { Content } = Layout;
const AppContainer = ({ title, children }) => {
  //   const location = useLocation();
  const { authUserSuccess } = useSelector((state) => state.auth);

  //   const crumbs = location.pathname.split("/").filter((item) => item !== "");
  const token = getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/auth/login");
    if (!isEmpty(authUserSuccess) && !authUserSuccess?.user?.is_admin) {
      navigate("/");
      notification.error({
        message: "You are not authorized to access this page",
      });
    }
  }, [token]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <AppSider />
      <Layout className="bg-white">
        <AppHeader />
        <Content className="px-3 pt-3">
          <Typography.Title level={3}>{title}</Typography.Title>
          {/* <Breadcrumb className="my-1">
        {crumbs.map((item, index) => {
          return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
        })}
      </Breadcrumb> */}
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

AppContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default AppContainer;
