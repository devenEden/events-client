import { Spin, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";

const AppLoader = ({ loading, message, children }) => {
  return (
    <div>
      {loading ? (
        <div className="m-5 d-flex flex-column align-items-center">
          <Spin size="large" />
          <Typography.Title level={5}>
            {message ? message : "Loading..."}
          </Typography.Title>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

AppLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  children: PropTypes.node,
};

export default AppLoader;
