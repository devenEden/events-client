import { useEffect } from "react";
import { notification } from "antd";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";

const useNotification = (prevState, serverError, serverSuccess) => {
  useEffect(() => {
    if (!isEmpty(prevState)) {
      if (!isEmpty(serverError) && prevState.serverError !== serverError) {
        notification.error({
          message: serverError?.server?.message,
          description: serverError?.message,
        });
      }
      if (
        !isEmpty(serverSuccess) &&
        prevState.serverSuccess !== serverSuccess
      ) {
        notification.success({
          message: serverSuccess?.server?.message,
        });
      }
    }
  }, [serverError, serverSuccess]);

  return true;
};

useNotification.propTypes = {
  prevState: PropTypes.object,
};

export default useNotification;
