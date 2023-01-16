import axios from "axios";
import { method } from "lodash";
import { takeLatest, put, fork } from "redux-saga/effects";
import actions from "../../actions";
import { setToken } from "../../services/storage.service";
const { authActions } = actions;

function* login({ data }) {
  try {
    const response = yield axios({
      url: "/users/auth/login/",
      method: "POST",
      data,
    });

    yield put({ type: authActions.LOGIN_SUCCESS, data: response });
    setToken(response.access_token);
  } catch (error) {
    yield put({ type: authActions.LOGIN_ERROR, error: error.data });
  }
}

function* watchLogin() {
  yield takeLatest(authActions.LOGIN_REQUEST, login);
}

function* register({ data }) {
  try {
    const response = yield axios({
      url: "/users/auth/register/",
      method: "POST",
      data,
    });

    yield put({ type: authActions.REGISTER_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: authActions.REGISTER_ERROR, error: error.data });
  }
}

function* watchRegisterUser() {
  yield takeLatest(authActions.REGISTER_REQUEST, register);
}

function* authUser() {
  try {
    const response = yield axios({
      url: "/users/auth/verify-token",
      method: "GET",
    });

    yield put({ type: authActions.AUTH_USER_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: authActions.AUTH_USER_ERROR, error: error.data });
  }
}

function* watchAuthUser() {
  yield takeLatest(authActions.AUTH_USER_REQUEST, authUser);
}


function* confirmAccount({ data, token }) {
  try {
    const response = yield axios({
      url: `/users/auth/verify-account/${token}`,
      method: "POST",
      data,
    });
    yield put({ type: authActions.CONFIRM_ACCOUNT_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: authActions.CONFIRM_ACCOUNT_ERROR, error: error.data });
  }
}

function* watchConfirmAccount() {
  yield takeLatest(authActions.CONFIRM_ACCOUNT_REQUEST, confirmAccount);
}

export default [
  fork(watchLogin),
  fork(watchRegisterUser),
  fork(watchConfirmAccount),
  fork(watchAuthUser)
];
