import loginReducer from "./login/reducer";
import userReducer from "./user/reducer";
import notificationReducer from "./notification/reducer";
import importReducer from "./import/reducer";
import chartReducer from "./charts/reducer";
import candidatesReducer from "./candidates/reducer";
import clientsReducer from "./clients-dashboard/reducer"
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  userReducer,
  loginReducer,
  notificationReducer,
  importReducer,
  chartReducer,
  candidatesReducer,
  clientsReducer
});

export default rootReducers;
