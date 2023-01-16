import appUiInitialState from "./app/appUi.initialState";
import server from "./app/server.initialState";
import authInitialState from "./auth/auth.initialState";
import bookingInitialState from "./booking.initialState";
import eventsInitalState from "./events.initialState";
import ticketsInitialState from "./tickets.initialState";
const initialState = {
  ...server,
  ...authInitialState,
  ...eventsInitalState,
  ...ticketsInitialState,
  ...bookingInitialState,
  ...appUiInitialState,
};

export default initialState;
