import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({ userReducer });

export default rootReducers;
