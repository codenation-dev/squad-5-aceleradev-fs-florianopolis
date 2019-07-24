import userReducer from "./user/reducer";
import clientsReducer from "./clients/reducer";
import { combineReducers } from "redux";
import chartReducer from './charts/reducer'

const rootReducers = combineReducers({ userReducer, chartReducer, clientsReducer });

export default rootReducers;
