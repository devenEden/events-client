import React from "react";
import { theme } from "antd";
import PropTypes from "prop-types";

const BgContainer = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div
      className="w-100 h-100 d-inline-block rounded-3"
      style={{ background: colorBgContainer }}
    >
      {children}
    </div>
  );
};

BgContainer.propTypes = {
  children: PropTypes.node,
};

export default BgContainer;
