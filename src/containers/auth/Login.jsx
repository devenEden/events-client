import { Button, Input, Form, Alert, notification } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import {
  AiOutlineEnvironment,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai";
import usePrevious from "../../components/hooks/usePrevious";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../config/actions";
import { useNavigate } from "react-router-dom";
import { setLocalStorageItem } from "../../config/services/storage.service";
const { authActions } = actions;

const Login = () => {
  const { loginLoading, loginError, loginSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const prevState = usePrevious({ loginSuccess });
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(authActions.login(values));
  };

  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(loginSuccess) &&
      prevState.loginSuccess !== loginSuccess
    ) {
      if (loginSuccess.token) {
        navigate("/");
        setLocalStorageItem("access_token", loginSuccess.token);
        notification.success({ message: loginSuccess?.server?.message });
      }
    }
  }, [prevState, loginSuccess]);
  return (
    <div>
      <h3 className="display-3 text-center">
        <AiOutlineEnvironment />
      </h3>
      <h3 className="text-center fw-normal">Events App</h3>
      <div className="w-100 d-flex flex-column align-items-center pt-3">
        <Form onFinish={onFinish} layout="vertical" className="w-50">
          {!isEmpty(loginError) && (
            <>
              {loginError?.non_field_errors?.map((err) => (
                <Alert
                  className="my-2"
                  showIcon
                  type="error"
                  key={err}
                  message={err}
                />
              ))}
            </>
          )}
          <Form.Item name={"username"}>
            <Input
              size="large"
              prefix={<AiOutlineUser />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item name={"password"}>
            <Input.Password
              size="large"
              prefix={<AiOutlineLock />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loginLoading}
              type="primary"
              size="large"
              className="w-100"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <Button type="text text-dark">Forgot Your Password ?</Button>
        <div className="p-3 w-50 border-bottom" />
        <p className="text-center my-3">Dont Have an Account ?</p>
        <Button size="large" className="w-50">
          Create New Account
        </Button>
      </div>
    </div>
  );
};

export default Login;
