import { all } from "redux-saga/effects";
import authSaga from "./auth/auth.saga";
import bookingSaga from "./booking.saga";
import eventsSaga from "./events/events.saga";
import scanSaga from "./scan/scan.saga";
import ticketsSaga from "./tickets.saga";

export default function* root() {
  yield all([
    ...authSaga,
    ...eventsSaga,
    ...ticketsSaga,
    ...bookingSaga,
    ...scanSaga,
  ]);
}
