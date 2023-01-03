import axios from "axios";
import { takeLatest, fork, put } from "redux-saga/effects";

import actions from "../actions";
const { ticketActions } = actions;

function* getTickets() {
  try {
    const response = yield axios({
      url: "/tickets/",
      method: "GET",
    });

    yield put({ type: ticketActions.GET_TICKETS_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: ticketActions.GET_TICKETS_ERROR, error: error.data });
  }
}

function* watchGetTickets() {
  yield takeLatest(ticketActions.GET_TICKETS_REQUEST, getTickets);
}

function* getTicketDetails({ data }) {
  try {
    const response = yield axios({
      url: `/tickets/${data.id}/`,
      method: "GET",
    });

    yield put({
      type: ticketActions.GET_TICKET_DETAILS_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: ticketActions.GET_TICKET_DETAILS_ERROR,
      error: error.data,
    });
  }
}

function* watchGetTicketDetails() {
  yield takeLatest(ticketActions.GET_TICKET_DETAILS_REQUEST, getTicketDetails);
}

function* addTicket({ data }) {
  try {
    const response = yield axios({
      url: "/tickets/",
      method: "POST",
      data,
    });

    yield put({ type: ticketActions.ADD_TICKETS_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: ticketActions.ADD_TICKETS_ERROR, error: error.data });
  }
}

function* watchAddTicket() {
  yield takeLatest(ticketActions.ADD_TICKETS_REQUEST, addTicket);
}

function* updateTicket({ data }) {
  try {
    const response = yield axios({
      url: `/tickets/${data.id}/`,
      method: "PUT",
      data,
    });

    yield put({ type: ticketActions.UPDATE_TICKETS_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: ticketActions.UPDATE_TICKETS_ERROR, error: error.data });
  }
}

function* watchUpdateTicket() {
  yield takeLatest(ticketActions.UPDATE_TICKETS_REQUEST, updateTicket);
}

function* deleteTicket({ data }) {
  try {
    const response = yield axios({
      url: `/tickets/${data.id}/`,
      method: "DELETE",
      data,
    });

    yield put({ type: ticketActions.DELETE_TICKETS_SUCCESS, data: response });
  } catch (error) {
    yield put({ type: ticketActions.DELETE_TICKETS_ERROR, error: error.data });
  }
}

function* watchDeleteTicket() {
  yield takeLatest(ticketActions.DELETE_TICKETS_REQUEST, deleteTicket);
}

export default [
  fork(watchGetTickets),
  fork(watchGetTicketDetails),
  fork(watchAddTicket),
  fork(watchUpdateTicket),
  fork(watchDeleteTicket),
];
