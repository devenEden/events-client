import axios from "axios";
import { takeLatest, put, fork } from "redux-saga/effects";

import actions from "../actions";
const { bookingActions } = actions;

function* getBookings() {
  try {
    const response = yield axios({
      url: "/bookings/",
      method: "GET",
    });

    yield put({ type: bookingActions.GET_BOOKING_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: bookingActions.GET_BOOKING_ERROR, error: error.data });
  }
}

function* watchGetBookings() {
  yield takeLatest(bookingActions.GET_BOOKING_REQUEST, getBookings);
}

function* getBookingDetails({ data }) {
  try {
    const response = yield axios({
      url: `/bookings/${data.id}/`,
      method: "GET",
    });

    yield put({
      type: bookingActions.GET_BOOKING_DETAILS_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: bookingActions.GET_BOOKING_DETAILS_ERROR,
      error: error.data,
    });
  }
}

function* watchGetBookingDetails() {
  yield takeLatest(
    bookingActions.GET_BOOKING_DETAILS_REQUEST,
    getBookingDetails
  );
}

function* addBooking({ data }) {
  try {
    const response = yield axios({
      url: "/bookings/",
      method: "POST",
      data,
    });

    yield put({ type: bookingActions.ADD_BOOKING_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: bookingActions.ADD_BOOKING_ERROR, error: error.data });
  }
}

function* watchAddBooking() {
  yield takeLatest(bookingActions.ADD_BOOKING_REQUEST, addBooking);
}

function* deleteBooking({ data }) {
  try {
    const response = yield axios({
      url: `/bookings/${data.id}/`,
      method: "DELETE",
    });

    yield put({ type: bookingActions.DELETE_BOOKING_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: bookingActions.DELETE_BOOKING_ERROR, error: error.data });
  }
}

function* watchDeleteBooking() {
  yield takeLatest(bookingActions.DELETE_BOOKING_REQUEST, deleteBooking);
}

function* updateBooking({ data }) {
  try {
    const response = yield axios({
      url: `/bookings/${data.id}/`,
      method: "PUT",
      data,
    });

    yield put({ type: bookingActions.UPDATE_BOOKING_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: bookingActions.UPDATE_BOOKING_ERROR, error: error.data });
  }
}

function* watchUpdateBooking() {
  yield takeLatest(bookingActions.UPDATE_BOOKING_REQUEST, updateBooking);
}

export default [
  fork(watchGetBookings),
  fork(watchGetBookingDetails),
  fork(watchAddBooking),
  fork(watchDeleteBooking),
  fork(watchUpdateBooking),
];
