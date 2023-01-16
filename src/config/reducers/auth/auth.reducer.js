import initialState from "../../initialState";
import actions from "../../actions";
const { authActions } = actions;

const auth = (state = initialState.auth, actions) => {
  switch (actions.type) {
    case authActions.LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginError: {},
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: actions.data,
      };
    case authActions.LOGIN_ERROR:
      return {
        ...state,
        loginError: actions.error,
        loginLoading: false,
      };
    case authActions.REGISTER_REQUEST:
      return {
        ...state,
        registerLoading: true,
        registerError: {},
      };
    case authActions.REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: actions.data,
      };
    case authActions.REGISTER_ERROR:
      return {
        ...state,
        registerLoading: false,
        registerError: actions.error,
      };
    case authActions.AUTH_USER_REQUEST:
      return {
        ...state,
        authUserLoading: true,
      };
    case authActions.AUTH_USER_SUCCESS:
      return {
        ...state,
        authUserLoading: false,
        authUserSuccess: actions.data,
      };
    case authActions.AUTH_USER_ERROR:
      return {
        ...state,
        authUserLoading: false,
        authUserError: actions.error,
        authUserSuccess: {},
      };

    default:
      return state;
  }
};

export default auth;
