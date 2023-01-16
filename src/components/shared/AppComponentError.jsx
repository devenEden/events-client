import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { Alert } from "antd";

const AppComponentError = ({ error, children }) => {
  return (
    <div className="d-flex w-100 justify-content-center">
      {isEmpty(error) ? (
        children
      ) : (
        <Alert type="error" message={error?.message} showIcon className="m-2" />
      )}
    </div>
  );
};

AppComponentError.propTypes = {
  children: PropTypes.node,
  error: PropTypes.object,
};

export default AppComponentError;
