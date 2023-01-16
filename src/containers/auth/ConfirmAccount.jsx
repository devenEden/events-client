import React, { useEffect } from "react";
import { Form, Button, Input, Modal, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import usePrevious from "../../components/hooks/usePrevious";
import { isEmpty } from "lodash";
import { useNavigate, useLocation, Link } from "react-router-dom";
import actions from "../../config/actions";
const { authActions } = actions;

const ConfirmAccount = () => {
  const { confirmAccountSuccess, confirmAccountError, confirmAccountLoading } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const prevState = usePrevious({ confirmAccountSuccess, confirmAccountError });

  // use effects
  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(confirmAccountError) &&
      prevState.confirmAccountError !== confirmAccountError
    ) {
      Modal.error({
        title: confirmAccountError?.server?.message.toUpperCase() || "ERROR",
        content: confirmAccountError?.message,
      });
    }
  }, [confirmAccountError]);

  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(confirmAccountSuccess) &&
      prevState.confirmAccountSuccess !== confirmAccountSuccess
    ) {
      if (confirmAccountSuccess.server?.status === true) {
        navigate("/auth/login");
        Modal.success({
          title: "SUCCESSFULLY VERIFIED YOUR ACCOUNT!",
          content: "You can now login to your account",
        });
      }
    }
  }, [confirmAccountSuccess]);

  let token = location.pathname.split("/");
  token = token[token.length - 1];

  const onFinish = (values) => {
    dispatch(authActions.confirmAccount(values, token));
    // console.log(values, token);
  };

  return (
    <div className="d-flex flex-column justify-content-center w-75">
      <h1 className="heading-xlarge text-center p-2">
        Confirm your <Link to="/">Events App</Link> Account!
      </h1>
      <Card className="w-100">
        <div className="d-flex justify-content-center w-100">
          <Form
            name="confirm-account"
            onFinish={onFinish}
            layout="vertical"
            className="w-100"
          >
            <Form.Item
              label="Code"
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please input your code!",
                },
              ]}
            >
              <Input placeholder="Code" size="large" className="w-100" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-100"
                loading={confirmAccountLoading}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmAccount;
