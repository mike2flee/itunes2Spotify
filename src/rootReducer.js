import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counterReducer from "./reducers/counterReducer";
import spotifyUserReducer from "./reducers/spotifyUserReducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  counter: counterReducer,
  spotifyUser: spotifyUserReducer
});

export default rootReducer;
