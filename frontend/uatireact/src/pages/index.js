import User from "./User";
import Admin from "./Admin";
import Dashboard from "./Dashboard";
import ImportPage from "./ImportPage";
import Login from "./Login";
import Register from "./Register";
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
  register: {
    path: "/register",
    component: Register
  },
  notifications: {
    path: "/notifications",
    component: Notifications
  }
};

export { User, Admin, Dashboard, ImportPage, Login, Register, Notifications };
