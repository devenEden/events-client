import React from "react";
import { Layout, Typography } from "antd";
import PropTypes from "prop-types";
// import { useLocation } from "react-router-dom";
const { Content } = Layout;
const AppContainer = ({ title, children }) => {
  //   const location = useLocation();

  //   const crumbs = location.pathname.split("/").filter((item) => item !== "");

  return (
    <Content className="px-3 pt-3">
      <Typography.Title level={3}>{title}</Typography.Title>
      {/* <Breadcrumb className="my-1">
        {crumbs.map((item, index) => {
          return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
        })}
      </Breadcrumb> */}
      <div>{children}</div>
    </Content>
  );
};

AppContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default AppContainer;
