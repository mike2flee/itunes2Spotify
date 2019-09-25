import { spotifyPlaylistActions } from "../actions/spotifyPlaylistActions";
const cheerio = require("cheerio");

const intialState = {
  status: "",
  playLIstID: "",
  isRequestComplete: false,
  trackListUri: [],
  playListTitle: "",
  songList: [],
  pullin: ""
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
      try {
        oldList.push(songItem[0].uri);
      } catch (error) {
        console.log(error);
        console.log(actions.payload.data.tracks);
      }
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
    //Pull
    case `${spotifyPlaylistActions.PULL_SONGS}_PENDING`:
      return Object.assign({}, state, {
        status: "PENDING",
        isRequestComplete: false
      });
    case `${spotifyPlaylistActions.PULL_SONGS}_FULFILLED`:
      let playlistName = "";
      let songLibrary = [];
      let songLibraryInit = [];
      let songLibraryFin = [];
      let name = [];
      let song = function(songName, artist) {
        this.songName = songName;
        this.artist = artist;
      };

      const $ = cheerio.load(actions.payload.data.httpResponse, {
        normalizeWhitespace: true,
        xmlMode: true
      });
      var title = $(".product-header__title");
      const tracks = $(".tracklist-item__text");
      var songString = tracks.text();
      const title2 = title.html();
      playlistName = title2.toString();
      console.log("this is the title");
      console.log(playlistName);
      name.push(playlistName);

      var bag = "";
      var i;
      for (i = 0; i < songString.length; i++) {
        if (songString.charAt(i) !== " ") {
          bag += songString.charAt(i);
        } else if (
          songString.charAt(i) === " " &&
          songString.charAt(i + 1) === " "
        ) {
          songLibraryInit.push(bag);
          bag = "";
        } else {
          bag += " ";
        }
      }

      for (i = 0; i < songLibraryInit.length; i++) {
        if (songLibraryInit[i] !== "") {
          songLibraryFin.push(songLibraryInit[i]);
        }
      }

      var firstSong = new song("testSongName", "testArtist");
      firstSong.songName = songLibraryFin[0];
      firstSong.artist = songLibraryFin[1];
      songLibrary.push(firstSong);
      for (i = 2; i < songLibraryFin.length; i++) {
        if (i % 2 === 0) {
          var music = new song(songLibraryFin[i], songLibraryFin[i + 1]);
          // console.log("i is equal to : " + i);
          songLibrary.push(music);
        }
      }
      return Object.assign({}, state, {
        status: "FULFILLED",
        isRequestComplete: true,
        pullin: actions.payload.data.httpResponse,
        songList: songLibrary,
        playListTitle: name[0]
      });
    case `${spotifyPlaylistActions.PULL_SONGS}_REJECTED`:
      return Object.assign({}, state, {
        status: "REJECTED",
        isRequestComplete: false
      });
    default:
      return state;
  }
}
