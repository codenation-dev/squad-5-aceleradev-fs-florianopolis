import userReducer from "./user/reducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({ userReducer });

export default rootReducers;
