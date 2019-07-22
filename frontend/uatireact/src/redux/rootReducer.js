import userReducer from "./user/reducer";
import clientsReducer from "./clients/reducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({ userReducer, clientsReducer });

export default rootReducers;
