import React from "react";
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
//Varaibl
const request = require("request");

class nextPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  iTunesDom() {
    this.props.actions.pullSongs(this.state.linkUrl);
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
      this.props.playListName
    );

    this.message(this.props.listOfSongs);
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
    browserHistory.push("/finished");
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
    trackUri: state.spotifyPlaylist.trackListUri,
    playListName: state.spotifyPlaylist.playListTitle,
    listOfSongs: state.spotifyPlaylist.songList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nextPage);
