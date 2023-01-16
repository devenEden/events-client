const auth = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGIN_REQUEST: "LOGIN_REQUEST",

  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_ERROR: "REGISTER_ERROR",
  REGISTER_REQUEST: "REGISTER_REQUEST",

  CONFIRM_ACCOUNT_SUCCESS: "CONFIRM_ACCOUNT_SUCCESS",
  CONFIRM_ACCOUNT_ERROR: "CONFIRM_ACCOUNT_ERROR",
  CONFIRM_ACCOUNT_REQUEST: "CONFIRM_ACCOUNT_REQUEST",

  login: (data) => ({
    type: auth.LOGIN_REQUEST,
    data,
  }),
  register: (data) => ({
    type: auth.REGISTER_REQUEST,
    data,
  }),
  confirmAccount: (data, token) => ({
    type: auth.CONFIRM_ACCOUNT_REQUEST,
    data,
    token,
  }),
};

export default auth;
