import { spotifyPlaylistActions } from "../actions/spotifyPlaylistActions";

const intialState = {
  status: "",
  playLIstID: "",
  isRequestComplete: false,
  trackListUri: []
};

export default function spotifyPlaylistReducer(state = intialState, actions) {
  switch (actions.type) {
    //CREATE PLAYLIST
    case `${spotifyPlaylistActions.CREATE_PLAYLIST}_PENDING`:
      return Object.assign({}, state, {
        status: "PENDING",
        isRequestComplete: false
      });
    case `${spotifyPlaylistActions.CREATE_PLAYLIST}_FULFILLED`:
      return Object.assign({}, state, {
        status: "FULFILLED",
        isRequestComplete: true,
        playLIstID: actions.payload.data.id
      });
    case `${spotifyPlaylistActions.CREATE_PLAYLIST}_REJECTED`:
      return Object.assign({}, state, {
        status: "REJECTED",
        isRequestComplete: false
      });

    //SONG SEARCH
    case `${spotifyPlaylistActions.SONG_SEARCH}_PENDING`:
      return Object.assign({}, state, {
        status: "PENDING",
        isRequestComplete: false
      });
    case `${spotifyPlaylistActions.SONG_SEARCH}_FULFILLED`:
      let oldList = intialState.trackListUri;
      let songItem = actions.payload.data.tracks.items;
      return Object.assign({}, state, {
        status: "FULFILLED",
        isRequestComplete: true,
        trackListUri: oldList
      });
    case `${spotifyPlaylistActions.SONG_SEARCH}_REJECTED`:
      return Object.assign({}, state, {
        status: "REJECTED",
        isRequestComplete: false
      });

    // COMPLET PLAYLIST
    case `${spotifyPlaylistActions.COMPLETE_PLAYLIST}_PENDING`:
      return Object.assign({}, state, {
        status: "PENDING",
        isRequestComplete: false
      });
    case `${spotifyPlaylistActions.COMPLETE_PLAYLIST}_FULFILLED`:
      return Object.assign({}, state, {
        status: "FULFILLED",
        isRequestComplete: true
      });
    case `${spotifyPlaylistActions.COMPLETE_PLAYLIST}_REJECTED`:
      return Object.assign({}, state, {
        status: "REJECTED",
        isRequestComplete: false
      });

    default:
      return state;
  }
}
