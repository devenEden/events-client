import axios from "axios";
import { takeLatest, put, fork } from "redux-saga/effects";
import actions from "../../actions";
const { authActions } = actions;

function* login({ data }) {
  try {
    const response = yield axios({
      url: "/users/auth/login/",
      method: "POST",
      data,
    });

    yield put({ type: authActions.LOGIN_SUCCESS, data: response });
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

export default [fork(watchLogin), fork(watchRegisterUser)];
