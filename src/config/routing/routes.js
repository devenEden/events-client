import {
  AiOutlineCalendar,
  AiOutlineDesktop,
  AiOutlineLogout,
  AiOutlineQrcode,
  AiOutlineScan,
  AiOutlineSetting,
  AiOutlineWallet,
} from "react-icons/ai";
import Settings from "../../containers/app/Settings";
import Login from "../../containers/auth/Login";
import Events from "../../containers/events/Events";
import ManageEvents from "../../containers/events/ManageEvents";
import MyBookings from "../../containers/events/MyBookings";
import MyEvents from "../../containers/events/MyEvents";
import AuthLayout from "../../layouts/AuthLayout";
import EventDetails from "../../containers/events/EventDetails";
import Signup from "../../containers/auth/Signup";
import ConfirmAccount from "../../containers/auth/ConfirmAccount";
import Scan from "../../containers/scan/Scan";

const routes = {
  internalRoutes: {
    path: "/",
    children: [
      {
        path: "/",
        label: "Events",
        element: Events,
        icon: AiOutlineCalendar,
        is_on_menu: false,
      },
      {
        path: "/scan/:id",
        element: Scan,
        icon: AiOutlineScan,
        is_on_menu: false,
        label: "Scan",
      },
      {
        path: "/my-events",
        element: MyEvents,
        label: "My Events",
        icon: AiOutlineDesktop,
        is_on_menu: true,
      },
      {
        path: "/my-tickets",
        element: MyBookings,
        label: "My Tickets",
        icon: AiOutlineQrcode,
        is_on_menu: false,
      },
      {
        path: "/events/:id",
        label: "Event Details",
        element: EventDetails,
        icon: AiOutlineWallet,
        is_on_menu: false,
      },
      {
        path: "settings",
        label: "Settings",
        element: Settings,
        icon: AiOutlineSetting,
        is_on_menu: true,
      },
      {
        path: "manage-events/:id",
        label: "Manage Events",
        element: ManageEvents,
        icon: AiOutlineSetting,
        is_on_menu: false,
      },
      {
        path: "add-event",
        label: "Add Event",
        element: ManageEvents,
        icon: AiOutlineSetting,
        is_on_menu: false,
      },
      {
        path: "logout",
        label: "Logout",
        element: ManageEvents,
        icon: AiOutlineLogout,
        is_on_menu: true,
      },
    ],
  },
  externalRoutes: {
    element: AuthLayout,
    path: "/auth",
    children: [
      {
        path: "login",
        element: Login,
      },
      {
        path: "signup",
        element: Signup,
      },
      {
        path: "confirm-account/:token",
        element: ConfirmAccount,
      },
    ],
  },
};

export default routes;
