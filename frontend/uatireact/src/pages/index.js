import User from "./User";
import Admin from "./Admin";
import Dashboard from "./Dashboard";
import ImportPage from "./ImportPage";
import Login from "./Login";
import Notifications from "./Notifications";

export const routes = {
  dashboard: {
    path: "/dashboard",
    component: Dashboard
  },
  user: {
    path: "/user",
    component: User
  },
  admin: {
    path: "/admin",
    component: Admin
  },
  import: {
    path: "/import",
    component: ImportPage
  },
  login: {
    path: "/login",
    component: Login
  },
  notifications: {
    path: "/notifications",
    component: Notifications
  }
};

export { User, Admin, Dashboard, ImportPage, Login, Notifications };
