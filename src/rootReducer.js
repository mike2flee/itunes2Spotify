import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counterReducer from "./reducers/counterReducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  counter: counterReducer
});

export default rootReducer;
