import React from "react";
import { Button } from "reactstrap";
import { Col } from "reactstrap";
import { browserHistory } from "react-router";
import uriConstants from "./common/constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object"
    };
    this.spotifyLogin = this.spotifyLogin.bind(this);
    this.goToHome = this.goToHome.bind(this);
    this.goToCheers = this.goToCheers.bind(this);
  }

  spotifyLogin() {
    let theLink = "https://accounts.spotify.com/en/authorize?client_id=";
    theLink = theLink.concat(uriConstants.CLIENT_ID);
    theLink = theLink.concat("&response_type=token&scope=");
    theLink = theLink.concat(uriConstants.FULL_PLAYLIST_AND_TRACK_MOD);
    theLink = theLink.concat("&redirect_uri=");
    theLink = theLink.concat(uriConstants.REDIRECTURL);
    window.location.replace(theLink);
  }

  goToHome() {
    browserHistory.push("/playListCreation");
  }
  goToCheers() {
    browserHistory.push("/Cheers");
  }

  render() {
    return (
      <Col className="centerStuff" sm={{ size: 8, offset: 2 }}>
        <div className="logo"></div>
        <Button
          className="centerStuff boxShadow text"
          color="primary"
          size="lg"
          onClick={this.spotifyLogin}
        >
          Spotify Login
        </Button>
      </Col>
    );
  }
}

export default App;
