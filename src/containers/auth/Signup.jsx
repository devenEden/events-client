import React, { useEffect } from "react";
import { Form, Button, Input, Select, Modal } from "antd";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import usePrevious from "../../components/hooks/usePrevious";
import { isEmpty } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import actions from "../../config/actions";
import AppComponentError from "../../components/shared/AppComponentError";
const { authActions } = actions;

const Signup = () => {
  const { registerLoading, registerError, registerSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const prevState = usePrevious({ registerSuccess });
  const navigate = useNavigate();

  const onFinish = (values) => {
    // add is_admin field in values
    values.is_admin = false;
    dispatch(authActions.register(values));
  };

  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(registerSuccess) &&
      prevState.registerSuccess !== registerSuccess
    ) {
      // navigate to login page
      navigate("/auth/login");
      Modal.success({
        title: "SUCCESSFULLY CREATED ACCOUNT!",
        content:
          "Please check your email for a confirmation email to verify your account.",
      });
    } else if (!isEmpty(registerError)) {
      Modal.error({
        // convert title to upper case
        title: registerError?.server?.message.toUpperCase(),
        content: registerError?.message,
      });
    }
  }, [prevState, registerSuccess, registerError]);

  return (
    <div className="w-100 mt-5">
      <br className="d-md-none" />
      <br className="d-md-none" />
      <br className="d-md-none" />
      <br className="d-md-none" />
      <br className="d-md-none" />
      <br className="d-md-none" />
      <h1 className="mt-5 text-center fw-bold">
        Welcome to <Link to="/">Events App</Link>
      </h1>
      <AppComponentError error={registerError} />
      <div className="w-100  p-3 mt-3">
        <Form
          onFinish={onFinish}
          name="signup"
          autoComplete="off"
          layout="vertical"
        >
          <div className="d-md-flex flex-row justify-content-center w-100">
            <div className="form-input mx-1">
              <Form.Item
                label="First name"
                name="surname"
                rules={[
                  { required: true, message: "Please input your first name!" },
                  {
                    min: 3,
                    message:
                      "Your firstname should not be less than 3 characters",
                  },
                  {
                    max: 20,
                    message:
                      "Your firstname should not be greater than 20 characters",
                  },
                  {
                    whitespace: true,
                    message: "First name can't be empty",
                  },
                  {
                    validator: (_, value) => {
                      var symbols = /^[a-z ,.'-]+$/i;
                      if (value.match(symbols)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Only alpha-numeric characters allowed")
                      );
                    },
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please enter username!" },
                  {
                    min: 3,
                    message:
                      "Your username should not be less than 3 characters",
                  },
                  {
                    max: 20,
                    message:
                      "Your username should not be greater than 20 characters",
                  },
                  {
                    whitespace: true,
                    message: "Username can't be empty",
                  },
                  {
                    validator: (_, value) => {
                      var symbols = /^[a-z ,.'-]+$/i;
                      if (value.match(symbols)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Only alpha-numeric characters allowed")
                      );
                    },
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your other sex!" },
                ]}
              >
                <Select size="large">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Phone number"
                name="contact"
                rules={[
                  {
                    required: true,
                    message: "Phone number is required",
                  },
                  {
                    min: 10,
                    message: "Phone number can't be less than 10 numbers",
                  },
                  {
                    max: 10,
                    message: "Phone number can't be more than 10 numbers",
                  },
                  {
                    validator: (_, value) => {
                      var numbers = /^[0-9]+$/;
                      if (value.match(numbers)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Enter only numeric characters (numbers)")
                      );
                    },
                  },
                ]}
              >
                <Input placeholder="eg.07********" size="large" />
              </Form.Item>
            </div>
            <div className="form-input">
              <Form.Item
                label="Other names"
                name="other_names"
                rules={[
                  { required: true, message: "Please input your other names!" },
                  {
                    min: 3,
                    message:
                      "Your other names should not be less than 3 characters",
                  },
                  {
                    max: 20,
                    message:
                      "Your other names should not be greater than 20 characters",
                  },
                  {
                    whitespace: true,
                    message: "Other name can't be empty",
                  },
                  {
                    validator: (_, value) => {
                      var symbols = /^[a-z ,.'-]+$/i;
                      if (value.match(symbols)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Only alpha-numeric characters allowed")
                      );
                    },
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input
                  prefix={<AiOutlineMail className="text-secondary" />}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 8,
                    message:
                      "Your password should be greater than 8 characters",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  prefix={<AiOutlineLock className="text-secondary" />}
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  {
                    min: 8,
                    message:
                      "Your password should be greater than 8 characters",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<AiOutlineLock className="text-secondary" />}
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item className="w-100">
            <div className="w-100 d-flex justify-content-center">
              <Button
                className="w-50"
                type="primary"
                htmlType="submit"
                size="large"
                loading={registerLoading}
                shape="round"
              >
                Sign up
              </Button>
            </div>
          </Form.Item>
        </Form>
        <hr />
        <p className="text-center">Already Have an Account ? </p>
        <div className="d-flex justify-content-center">
          <Button onClick={() => navigate("/auth/login")} shape="round">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
