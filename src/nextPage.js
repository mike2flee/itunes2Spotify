import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { bindActionCreators } from "redux";
import { getUserData, jwtActionFunction } from "./actions/spotifyUserActions";
import { Row, Col, Container } from "reactstrap";
import { RotateLoader } from "react-spinners";
import {
  createNewPlaylist,
  spotifySongSearch,
  pullSongs
} from "./actions/spotifyPlaylistActions";
import Navigation from "./Navigation";

class nextPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkUrl: "",
      loading: this.props.loading,
      disabledButton: true
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
    console.log(hashArray);
    if (!(hashArray[0] === "#access_token")) {
      browserHistory.push("/");
    } else {
      const hashArray2 = hashArray[1].split("&");
      const jwt = hashArray2[0];
      this.props.actions.getJWT(jwt);
      this.props.actions.getUserData(jwt);
      browserHistory.push("/playListCreation");
    }
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
    if (event.target.value) {
      console.log("enables");
      this.setState({
        disabledButton: false
      });
    } else {
      this.setState({
        disabledButton: true
      });
    }
  }

  render() {
    return (
      <Container fluid="True" className="root">
        <Navigation></Navigation>
        <Row className="endBoxes"></Row>
        <Row className="landingPageRow">
          <Col sm={{ size: 8, offset: 2 }}>
            <h1>Welcome {this.props.userName}</h1>
            <Row className="mainSearch">
              {" "}
              {/* //Start of Content */}
              <Col className="centerStuff" sm={{ size: 8, offset: 2 }}>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  value={this.state.linkUrl}
                  onChange={this.handleChange}
                ></input>

                <Row>
                  {this.props.songPull === false ? (
                    <Button
                      className="centerStuff boxShadow text buttonMargin"
                      color="primary"
                      size="lg"
                      onClick={this.iTunesDom}
                      disabled={this.state.disabledButton}
                    >
                      Pull Playlist
                    </Button>
                  ) : (
                    <Button
                      className="centerStuff boxShadow text buttonMargin"
                      color="primary"
                      size="lg"
                      onClick={this.createPlaylist}
                    >
                      Create Playlist
                    </Button>
                  )}

                  <RotateLoader
                    sizeUnit={"px"}
                    size={150}
                    color={"#123abc"}
                    loading={this.state.loading}
                  />
                </Row>
              </Col>
              {/* //End of Content */}
            </Row>
          </Col>
        </Row>
        <Row className="endBoxes"></Row>
      </Container>
      // <div>
      //   <Input
      //     type="text"

      //   />
      //   <Button onClick={this.iTunesDom}>Song Pull</Button>
      //   <Button onClick={this.createPlaylist}>Create New PlayList</Button>
      // </div>
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
    listOfSongs: state.spotifyPlaylist.songList,
    songPull: state.spotifyPlaylist.songPullStatus,
    loading: state.spotifyPlaylist.loading,
    userName: state.spotifyUser.userName
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nextPage);
