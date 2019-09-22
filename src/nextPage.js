import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData, jwtActionFunction } from "./actions/spotifyUserActions";
import {
  createNewPlaylist,
  spotifySongSearch,
  completePLaylist
} from "./actions/spotifyPlaylistActions";
//Varaibles
const request = require("request");
const cheerio = require("cheerio");
let song = function(songName, artist) {
  this.songName = songName;
  this.artist = artist;
};
let playlistName = "";
var songLibrary = [];
var songLibraryInit = [];
var songLibraryFin = [];

class nextPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object",
      link: "https://music.apple.com/us/playlist/nonametwo/pl.u-PDb446ZsGMKXBo",
      listOfSongs: songLibrary
    };
    this.goToHome = this.goToHome.bind(this);
    this.urlGrab = this.urlGrab.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.iTunesDom = this.iTunesDom.bind(this);
    this.message = this.message.bind(this);
    this.completePlayListCreation = this.completePlayListCreation.bind(this);
  }

  componentDidMount() {
    this.urlGrab();
    this.iTunesDom();
    // this.songQuery(this.state.listOfSongs);
  }

  goToHome() {
    browserHistory.push("/");
  }

  iTunesDom() {
    request(this.state.link, function(error, response, html) {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html, {
          normalizeWhitespace: true,
          xmlMode: true
        });
        playlistName = $(".product-header__title");
        const userName = $(".product-header__identity");
        const tracks = $(".tracklist-item__text");
        var songString = tracks.text();
        // console.log("the character at x is: " + songString.charAt(9));
        console.log(playlistName.html());
        console.log(userName.html());
        // console.log(songString);
        // console.log(songLibraryInit);
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
        // console.log(songLibraryInit);
        for (i = 0; i < songLibraryInit.length; i++) {
          if (songLibraryInit[i] !== "") {
            songLibraryFin.push(songLibraryInit[i]);
          }
        }
        // console.log(songLibraryFin);
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
      }
    });
  }

  urlGrab() {
    const hash = window.location.hash;
    const hashArray = hash.split("=");
    const hashArray2 = hashArray[1].split("&");
    const jwt = hashArray2[0];
    this.props.actions.getJWT(jwt);
    this.props.actions.getUserData(jwt);
    browserHistory.push("/playListCreation");
  }

  createPlaylist() {
    //jwt, userId, playlistName)
    console.log("Createing Playlist");
    console.log(this.props.jwt);
    this.props.actions.createNewPlaylist(
      this.props.jwt,
      this.props.userId,
      "Almost Done"
    );
  }

  message = list => {
    var songs;
    for (songs of list) {
      this.props.actions.spotifySongSearch(
        this.props.jwt,
        songs.artist,
        songs.songName
      );
      console.log(songs);
    }
  };

  completePlayListCreation() {
    console.log("Adding Songs to playlist");
    // token, playlistid, songs
    this.props.actions.completePLaylist(
      this.props.jwt,
      this.props.playListId,
      this.props.trackUri
    );
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h1>{this.props.count}</h1>
        <button onClick={this.iTunesDom}>Itunes</button>
        <button onClick={this.goToHome}>Back</button>
        <button onClick={this.createPlaylist}>Create New PlayList</button>
        <button
          onClick={() => {
            this.message(this.state.listOfSongs);
          }}
        >
          Song Search{" "}
        </button>
        <button onClick={this.completePlayListCreation}>
          completePLaylist
        </button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getUserData,
        ...jwtActionFunction,
        createNewPlaylist,
        spotifySongSearch,
        completePLaylist
      },
      dispatch
    )
  };
}

function mapStateToProps(state) {
  return {
    count: state.counter.count,
    jwt: state.spotifyUser.jwt,
    userId: state.spotifyUser.userID,
    playListId: state.spotifyPlaylist.playLIstID,
    trackUri: state.spotifyPlaylist.trackListUri
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nextPage);
