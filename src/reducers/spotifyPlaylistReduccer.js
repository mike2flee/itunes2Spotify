import { spotifyPlaylistActions } from "../actions/spotifyPlaylistActions";

const intialState = {
  status: "",
  isRequestComplete: false,
  trackListUri: []
};

export default function spotifyPlaylistReducer(state = intialState, actions) {
  switch (actions.type) {
    case spotifyPlaylistActions.HOLD_PLAYLIST:
      return Object.assign({}, state, {
        songHolder: actions.tempSongList
      });
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

    case `${spotifyPlaylistActions.SONG_SEARCH}_PENDING`:
      return Object.assign({}, state, {
        status: "PENDING",
        isRequestComplete: false
      });
    case `${spotifyPlaylistActions.SONG_SEARCH}_FULFILLED`:
      let oldList = intialState.trackListUri;
      let songItem = actions.payload.data.tracks.items;
      console.log(songItem[0].uri);
      oldList.push(songItem[0].uri);
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

    default:
      return state;
  }
}
