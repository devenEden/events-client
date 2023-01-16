import server from "./app/server.reducer";
import auth from "./auth/auth.reducer";
import events from "./events/events.reducer";
import booking from "./booking.reducer";
import tickets from "./tickets.reducer";
import appUi from "./app/appUi.reducer";
import scan from "./scan/scan.reducer";

export default {
  server,
  auth,
  events,
  booking,
  tickets,
  appUi,
  scan,
};
