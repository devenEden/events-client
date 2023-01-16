import axios from "axios";
import { takeLatest, put, fork } from "redux-saga/effects";

import actions from "../../actions";
const { scanActions } = actions;

function* addScan({ data }) {
  try {
    const response = yield axios({ url: "/scan", method: "POST", data });

    yield put({ type: scanActions.ADD_SCAN_SUCCESS, data: response });
  } catch (error) {
    yield put({
      type: scanActions.ADD_SCAN_ERROR,
      error: error.data,
    });
  }
}

function* watchAddScan() {
  yield takeLatest(scanActions.ADD_SCAN_REQUEST, addScan);
}

function* onScan({ data }) {
  try {
    const response = yield axios({
      url: "/scan/on-scan",
      method: "POST",
      data,
    });

    yield put({ type: scanActions.ON_SCAN_SUCCESS, data: response });
  } catch (error) {
    yield put({
      type: scanActions.ON_SCAN_ERROR,
      error: error.data,
    });
  }
}

function* watchOnScan() {
  yield takeLatest(scanActions.ON_SCAN_REQUEST, onScan);
}

export default [fork(watchOnScan), fork(watchAddScan)];
