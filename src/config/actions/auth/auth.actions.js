const auth = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGIN_REQUEST: "LOGIN_REQUEST",

  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_ERROR: "REGISTER_ERROR",
  REGISTER_REQUEST: "REGISTER_REQUEST",

  AUTH_USER_SUCCESS: "AUTH_USER_SUCCESS",
  AUTH_USER_ERROR: "AUTH_USER_ERROR",
  AUTH_USER_REQUEST: "AUTH_USER_REQUEST",

  getAuthUser: () => ({
    type: auth.AUTH_USER_REQUEST,
  }),
  login: (data) => ({
    type: auth.LOGIN_REQUEST,
    data,
  }),
  register: (data) => ({
    type: auth.REGISTER_REQUEST,
    data,
  }),
};

export default auth;
