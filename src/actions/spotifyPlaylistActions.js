import axios from "axios";
import uriConstants from "../common/constants";
import { createAsyncAction } from "redux-promise-middleware-actions";

export const spotifyPlaylistActions = {
  CREATE_PLAYLIST: "CREATE_PLAYLIST",
  SONG_SEARCH: "SONG_SEARCH",
  ADD_SONG: "ADD_SONG",
  HOLD_PLAYLIST: "HOLD_PLAYLIST",
  COMPLETE_PLAYLIST: "COMPLETE_PLAYLIST",
  PULL_SONGS: "PULL_SONGS"
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
        return response;
      })
      .catch(function(error) {
        console.log(error);
      })
);

export const spotifySongSearch = createAsyncAction(
  spotifyPlaylistActions.SONG_SEARCH,
  (jwt, artist, song) =>
    axios({
      method: "get",
      url: `https://api.spotify.com/v1/search?q=artist:${artist}%20track:${song}&type=album,track&limit=1`,
      headers: {
        Authorization: "Bearer " + jwt
      }
    })
      .then(function(response) {
        console.log(response);
        return response;
      })
      .catch(function(error) {
        console.log(error);
      })
);

export const completePLaylist = createAsyncAction(
  spotifyPlaylistActions.COMPLETE_PLAYLIST,
  (jwt, playListId, songs) =>
    axios({
      method: "post",
      url: `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
      data: {
        uris: songs
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

export const pullSongs = createAsyncAction(
  spotifyPlaylistActions.PULL_SONGS,
  playListLink =>
    axios({
      method: "post",
      url: uriConstants.SONG_SERVICE,
      data: {
        itunesUrl: playListLink
      }
    })
      .then(function(response) {
        console.log(response);
        return response;
      })
      .catch(function(error) {
        console.log(error);
      })
);
