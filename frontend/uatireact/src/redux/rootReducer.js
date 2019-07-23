import userReducer from "./user/reducer";
import { combineReducers } from "redux";
import chartReducer from './charts/reducer'

const rootReducers = combineReducers({ userReducer, chartReducer });

export default rootReducers;
