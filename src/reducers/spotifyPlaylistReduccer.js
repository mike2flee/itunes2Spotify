import { spotifyPlaylistActions } from "../actions/spotifyPlaylistActions";

const intialState = {
  status: "",
  isRequestComplete: false
};

export default function spotifyPlaylistReducer(state = intialState, actions) {
  switch (actions.type) {
    case `${spotifyPlaylistActions.CREATE_PLAYLIST}_PENDING`:
      return Object.assign({}, state, {
        status: "PENDING",
        isRequestComplete: false
      });
    case `${spotifyPlaylistActions.CREATE_PLAYLIST}_FULFILLED`:
      return Object.assign({}, state, {
        status: "FULFILLED",
        isRequestComplete: true
      });
    case `${spotifyPlaylistActions.CREATE_PLAYLIST}_REJECTED`:
      return Object.assign({}, state, {
        status: "REJECTED",
        isRequestComplete: false
      });
    default:
      return state;
  }
}
