import axios from "axios";
//import uriConstants from "../common/constants";
import { createAsyncAction } from "redux-promise-middleware-actions";

export const spotifyPlaylistActions = {
  CREATE_PLAYLIST: "CREATE_PLAYLIST",
  SONG_SEARCH: "SONG_SEARCH",
  ADD_SONG: "ADD_SONG"
};
//Base URl needs to be modified
export const createNewPlaylist = createAsyncAction(
  spotifyPlaylistActions.CREATE_PLAYLIST,
  (jwt, userId, playlistName) =>
    axios({
      method: "post",
      url: `https://api.spotify.com/v1/users/${userId}/playlists`,
      data: {
        name: playlistName
      },
      headers: { Authorization: "Bearer " + jwt }
    })
      .then(function(response) {
        console.log(response);
        return response;
      })
      .catch(function(error) {
        console.log(error);
      })
);
