import axios from "axios";
import { takeLatest, fork, put } from "redux-saga/effects";
import actions from "../../actions";
const { eventActions } = actions;

function* getEvents() {
  try {
    const response = yield axios({
      url: "/events/",
      method: "GET",
    });

    yield put({ type: eventActions.GET_EVENTS_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: eventActions.GET_EVENTS_ERROR, error: error.data });
  }
}

function* watchGetEvents() {
  yield takeLatest(eventActions.GET_EVENTS_REQUEST, getEvents);
}

function* getEventDetails({ data }) {
  try {
    const response = yield axios({
      url: `/events/details/${data.id}`,
      method: "GET",
    });

    yield put({ type: eventActions.GET_EVENT_DETAILS_SUCCESS, data: response });
  } catch (error) {
    yield put({
      type: eventActions.GET_EVENT_DETAILS_ERROR,
      error: error.data,
    });
  }
}

function* watchGetEventDetails() {
  yield takeLatest(eventActions.GET_EVENT_DETAILS_REQUEST, getEventDetails);
}

function* addEvent({ data }) {
  try {
    const response = yield axios({
      url: data.path,
      method: "POST",
      data,
    });

    yield put({ type: eventActions.ADD_EVENTS_SUCCESS, data: response });
    yield put(eventActions.getEventDetails(data.event));
  } catch (error) {
    yield put({ type: eventActions.ADD_EVENTS_ERROR, error: error.data });
  }
}

function* watchAddEvent() {
  yield takeLatest(eventActions.ADD_EVENTS_REQUEST, addEvent);
}

function* updateEvent({ data, id }) {
  try {
    const response = yield axios({
      url: `/events/${id}/`,
      method: "PUT",
      data,
    });

    yield put({ type: eventActions.UPDATE_EVENTS_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: eventActions.UPDATE_EVENTS_ERROR, error: error.data });
  }
}

function* watchUpdateEvent() {
  yield takeLatest(eventActions.UPDATE_EVENTS_REQUEST, updateEvent);
}

function* deleteEvent({ id }) {
  try {
    const response = yield axios({
      url: `/events/${id}/`,
      method: "DELETE",
    });

    yield put({ type: eventActions.DELETE_EVENTS_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: eventActions.DELETE_EVENTS_ERROR, error: error.data });
  }
}

function* watchDeleteEvent() {
  yield takeLatest(eventActions.DELETE_EVENTS_REQUEST, deleteEvent);
}

function* getMyEvents() {
  try {
    const response = yield axios({
      url: `/events/my-events/`,
      method: "GET",
    });

    yield put({ type: eventActions.GET_MY_EVENTS_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: eventActions.GET_MY_EVENTS_ERROR, error: error.data });
  }
}

function* watchGetMyEvents() {
  yield takeLatest(eventActions.GET_MY_EVENTS_REQUEST, getMyEvents);
}

function* scanQrCode({ data }) {
  try {
    const response = yield axios({
      url: `/scan/events/${data.id}/`,
      method: "PUT",
      data,
    });

    yield put({ type: eventActions.SCAN_QR_CODE_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: eventActions.SCAN_QR_CODE_ERROR, error: error.data });
  }
}

function* watchScanQrCode() {
  yield takeLatest(eventActions.SCAN_QR_CODE_REQUEST, scanQrCode);
}

export default [
  fork(watchGetEvents),
  fork(watchGetEventDetails),
  fork(watchAddEvent),
  fork(watchUpdateEvent),
  fork(watchDeleteEvent),
  fork(watchGetMyEvents),
  fork(watchScanQrCode),
];
