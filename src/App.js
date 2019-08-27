import React from "react";
const request = require("request");
const cheerio = require("cheerio");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object",
      link: "https://music.apple.com/us/playlist/nonametwo/pl.u-PDb446ZsGMKXBo"
    };
    this.iTunesDom = this.iTunesDom.bind(this);
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

  render() {
    return (
      <div>
        <h1>iTunes -> Spotify</h1>
        <button onClick={this.iTunesDom}>CLICK</button>
        <div>{this.state.htmlBody}</div>
      </div>
    );
  }
}

export default App;
