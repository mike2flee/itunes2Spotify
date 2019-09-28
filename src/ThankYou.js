import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData, jwtActionFunction } from "./actions/spotifyUserActions";
import {
  spotifySongSearch,
  completePLaylist
} from "./actions/spotifyPlaylistActions";

class ThankYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object"
    };
    this.completePlayListCreation = this.completePlayListCreation.bind(this);
  }
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
        <h1>THank you </h1>
        <button onClick={this.completePlayListCreation}>Final</button>
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
)(ThankYou);
