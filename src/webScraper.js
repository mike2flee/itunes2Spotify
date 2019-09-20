import React from "react";
import { Button } from "reactstrap";
const request = require("request");
const cheerio = require("cheerio");

var Song = function(songName, artist){
  this.songName = songName; 
  this.artist = artist;
}

class webScraper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            htmlBody: "Enter Dev mode to view loaded cheerio object",
            link: "https://music.apple.com/us/playlist/summer-2019/pl.u-b3b88DNfkj9gYd"
        };
        this.iTunesDom = this.iTunesDom.bind(this);

    }

    iTunesDom() {
        request(this.state.link, function(error, response, html) {
          if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);
            const playlistName = $('.product-header__title');
            const userName = $('.product-header__identity');
            const tracks = $('.tracklist-item__text');
            console.log(playlistName.html()); 
            console.log(userName.html());
            console.log(tracks.text());
          }
        });
        this.setState({
          htmlBody: "link was loaded into cheerio"
        });
    }

    render() {
        return (
          <div>
            <h1> iTunes -> Spotify Cheerio Test</h1>
            <Button color="success" onClick={this.iTunesDom}>CLICK ME</Button>
            <div>{this.state.htmlBody}</div>
          </div>
        );
    }
}

export default webScraper;