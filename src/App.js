import React from "react";

import { browserHistory } from "react-router";
// const axios = require("axios");

const request = require("request");
const cheerio = require("cheerio");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object",
      link: "https://music.apple.com/us/playlist/nonametwo/pl.u-PDb446ZsGMKXBo",
      clientId: "08f46a77cd954c4d85850f76690146d3",
      clientSecret: "ab192b2513fc4557b82f7e681bc1fda0",
      scope1: "user-read-email",
      scope2: "user-follow-read",
      token: "",
      redirectURL: "http://localhost:3000/"
    };
    this.iTunesDom = this.iTunesDom.bind(this);
    this.otherPage = this.otherPage.bind(this);
    // this.spotifyLogin = this.spotifyLogin.bind(this);
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

  otherPage() {
    browserHistory.push("/next");
  }

  spotifyLogin() {
    window.location.replace(
      "https://accounts.spotify.com/en/authorize?client_id=08f46a77cd954c4d85850f76690146d3&response_type=token&scope=playlist-read-private%20playlist-modify%20playlist-modify-private&redirect_uri=http://localhost:3000/"
    );
  }

  render() {
    return (
      <div>
        <h1>iTunes -> Spotify</h1>
        <button onClick={this.iTunesDom}>CLICK</button>
        <button onClick={this.otherPage}>NEXT</button>
        <button onClick={this.spotifyLogin}>Spotify Login</button>

        <div>{this.state.htmlBody}</div>
      </div>
    );
  }
}

export default App;

// https://accounts.spotify.com/en/authorize?client_id=08f46a77cd954c4d85850f76690146d3&response_type=token&scope=playlist-read-private%20playlist-modify%20playlist-modify-private&redirect_uri=http://localhost:3000/
