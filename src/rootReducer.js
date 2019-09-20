import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counterReducer from "./reducers/counterReducer";
import spotifyUserReducer from "./reducers/spotifyUserReducer";
import spotifyPlaylistReducer from "./reducers/spotifyPlaylistReduccer";

const rootReducer = combineReducers({
  routing: routerReducer,
  counter: counterReducer,
  spotifyUser: spotifyUserReducer,
  spotifyPlaylist: spotifyPlaylistReducer
});

export default rootReducer;
