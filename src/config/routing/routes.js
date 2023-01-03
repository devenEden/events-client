import {
  AiOutlineCalendar,
  AiOutlineDesktop,
  AiOutlineLogout,
  AiOutlinePieChart,
  AiOutlineSetting,
} from "react-icons/ai";
import Settings from "../../containers/app/Settings";
import Login from "../../containers/auth/Login";
import Events from "../../containers/events/Events";
import ManageEvents from "../../containers/events/ManageEvents";
import MyEvents from "../../containers/events/MyEvents";
import AuthLayout from "../../layouts/AuthLayout";

const routes = {
  internalRoutes: {
    path: "/",
    children: [
      {
        path: "/events",
        label: "Events",
        element: Events,
        icon: AiOutlineCalendar,
        is_on_menu: true,
      },
      {
        path: "/my-events",
        element: MyEvents,
        label: "My Events",
        icon: AiOutlineDesktop,
        is_on_menu: true,
      },
      {
        path: "settings",
        label: "Settings",
        element: Settings,
        icon: AiOutlineSetting,
        is_on_menu: true,
      },
      {
        path: "manage-reports",
        label: "Reports",
        element: Events,
        icon: AiOutlinePieChart,
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
    ],
  },
};

export default routes;
