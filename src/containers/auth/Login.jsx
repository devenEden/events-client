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
import { Link, useNavigate } from "react-router-dom";
import AppComponentError from "../../components/shared/AppComponentError";
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
      if (loginSuccess.access_token.token) {
        navigate("/");
        notification.success({ message: loginSuccess?.server?.message });
      }
    }
  }, [prevState, loginSuccess]);

  const createAccount = () => {
    navigate("/auth/signup");
  };

  return (
    <div className="w-100">
      <h1 className="text-center display-2">
        <Link to="/">
          <AiOutlineEnvironment />
        </Link>
      </h1>
      <h1 className="mt-0 display-2 text-center fw-bold">Welcome Back!</h1>
      <AppComponentError error={loginError} />
      <div className="w-100 d-flex flex-column align-items-center pt-3">
        <Form onFinish={onFinish} layout="vertical" className="login-input">
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
          <Form.Item name={"email"}>
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
        <div className="p-3 border-bottom login-input" />
        <p className="text-center my-3">Dont Have an Account ?</p>
        <Button size="large" className="login-input" onClick={createAccount}>
          Create New Account
        </Button>
      </div>
    </div>
  );
};

export default Login;
