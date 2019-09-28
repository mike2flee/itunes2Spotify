import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData, jwtActionFunction } from "./actions/spotifyUserActions";
import {
  spotifySongSearch,
  completePLaylist
} from "./actions/spotifyPlaylistActions";
import { Button, Container, Row, Col } from "reactstrap";

class ThankYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object",
      pressed: false
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
    this.setState({
      pressed: true
    });
  }
  render() {
    return (
      <Container fluid="True" className="root">
        <Row className="landingPageRow">
          <Col className=" centerStuff">
            <Row>
              <Col className="centerStuff" sm={{ size: 8, offset: 2 }}>
                <h5>Finalize the Creation of {this.props.playListName}</h5>
                <div className="goodChoice"></div>
                <Button
                  color="primary"
                  onClick={this.completePlayListCreation}
                  disabled={this.state.pressed}
                  className="centerStuff  boxShadow text buttonMargin"
                  size="lg"
                >
                  Finalize
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
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
    trackUri: state.spotifyPlaylist.trackListUri,
    playListName: state.spotifyPlaylist.playListTitle
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThankYou);
