import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { counterActionFunctions } from "./actions/counterActions";
import { getUserData, jwtActionFunction } from "./actions/spotifyUserActions";
import { createNewPlaylist } from "./actions/spotifyPlaylistActions";

const request = require("request");
const cheerio = require("cheerio");

class nextPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object",
      link: "https://music.apple.com/us/playlist/nonametwo/pl.u-PDb446ZsGMKXBo"
    };
    this.goToHome = this.goToHome.bind(this);
    this.addToCount = this.addToCount.bind(this);
    this.urlGrab = this.urlGrab.bind(this);
    this.subtractCount = this.subtractCount.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.iTunesDom = this.iTunesDom.bind(this);
  }

  goToHome() {
    browserHistory.push("/");
  }

  addToCount() {
    console.log("We are at the start of the add function");
    this.props.actions.add();
  }

  subtractCount() {
    console.log("we are subtracting");
    this.props.actions.sub();
  }

  iTunesDom() {
    request(this.state.link, function(error, response, html) {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        console.log($("*"));
      }
    });
    this.setState({
      htmlBody: "link was loaded into cheerio"
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
      "Sample2"
    );
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h1>{this.props.count}</h1>
        <button onClick={this.iTunesDom}>Itunes</button>
        <button onClick={this.goToHome}>Back</button>
        <button onClick={this.addToCount}>ADD</button>
        <button onClick={this.subtractCount}>SUB</button>
        <button onClick={this.urlGrab}> url </button>
        <button onClick={this.createPlaylist}>Create Playlist</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...counterActionFunctions,
        getUserData,
        ...jwtActionFunction,
        createNewPlaylist
      },
      dispatch
    )
  };
}

function mapStateToProps(state) {
  return {
    count: state.counter.count,
    jwt: state.spotifyUser.jwt,
    userId: state.spotifyUser.userID
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nextPage);
