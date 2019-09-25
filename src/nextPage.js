import React from "react";
import axios from "axios";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData, jwtActionFunction } from "./actions/spotifyUserActions";
import {
  createNewPlaylist,
  spotifySongSearch,
  pullSongs
} from "./actions/spotifyPlaylistActions";
import { Button, Input } from "reactstrap";
//Varaibles
const request = require("request");

let song = function(songName, artist) {
  this.songName = songName;
  this.artist = artist;
};
let playlistName = "";
let songLibrary = [];
let songLibraryInit = [];
let songLibraryFin = [];
let name = [];

class nextPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object",
      link: "https://music.apple.com/us/playlist/nonametwo/pl.u-PDb446ZsGMKXBo",
      listOfSongs: songLibrary,
      playListTitle: name,
      linkUrl: ""
    };
    this.goToHome = this.goToHome.bind(this);
    this.urlGrab = this.urlGrab.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.iTunesDom = this.iTunesDom.bind(this);
    this.message = this.message.bind(this);
    this.callThis = this.callThis.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    console.log("will");
    this.urlGrab();
  }

  goToHome() {
    browserHistory.push("/");
  }

  // axios({
  //   method: "get",
  //   url: this.state.linkUrl,
  //   maxRedirects: 0
  // })

  iTunesDom() {
    this.props.actions.pullSongs(this.state.linkUrl);
    // axios({
    //   method: "get",
    //   url: this.state.linkUrl,
    //   maxRedirects: 0
    // }).then(
    //   response => {
    //     if (response.status === 200) {
    //       const html = response.data;
    //       const $ = cheerio.load(html, {
    //         normalizeWhitespace: true,
    //         xmlMode: true
    //       });
    //       var title = $(".product-header__title");
    //       const userName = $(".product-header__identity");
    //       const tracks = $(".tracklist-item__text");
    //       var songString = tracks.text();
    //       // console.log("the character at x is: " + songString.charAt(9));
    //       const title2 = title.html();
    //       playlistName = title2.toString();
    //       console.log("this is the title");
    //       console.log(playlistName);
    //       name.push(playlistName);
    //       // console.log(userName.html());
    //       // console.log(songString);
    //       // console.log(songLibraryInit);
    //       var bag = "";
    //       var i;
    //       for (i = 0; i < songString.length; i++) {
    //         if (songString.charAt(i) !== " ") {
    //           bag += songString.charAt(i);
    //         } else if (
    //           songString.charAt(i) === " " &&
    //           songString.charAt(i + 1) === " "
    //         ) {
    //           songLibraryInit.push(bag);
    //           bag = "";
    //         } else {
    //           bag += " ";
    //         }
    //       }
    //       // console.log(songLibraryInit);
    //       for (i = 0; i < songLibraryInit.length; i++) {
    //         if (songLibraryInit[i] !== "") {
    //           songLibraryFin.push(songLibraryInit[i]);
    //         }
    //       }
    //       // console.log(songLibraryFin);
    //       var firstSong = new song("testSongName", "testArtist");
    //       firstSong.songName = songLibraryFin[0];
    //       firstSong.artist = songLibraryFin[1];
    //       songLibrary.push(firstSong);
    //       for (i = 2; i < songLibraryFin.length; i++) {
    //         if (i % 2 === 0) {
    //           var music = new song(songLibraryFin[i], songLibraryFin[i + 1]);
    //           // console.log("i is equal to : " + i);
    //           songLibrary.push(music);
    //         }
    //       }
    //     }
    //   },
    //   error => console.log(error)
    // );
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
    this.props.actions.createNewPlaylist(
      this.props.jwt,
      this.props.userId,
      this.state.playListTitle[0]
    );

    this.message(this.state.listOfSongs);
    browserHistory.push("/finished");
  }

  callThis() {
    console.log("Called THis");
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

  handleChange(event) {
    this.setState({ linkUrl: event.target.value });
  }

  render() {
    return (
      <div>
        <Input
          type="text"
          value={this.state.linkUrl}
          onChange={this.handleChange}
        />
        <Button onClick={this.iTunesDom}>Song Pull</Button>
        <Button onClick={this.createPlaylist}>Create New PlayList</Button>
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
        pullSongs
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
