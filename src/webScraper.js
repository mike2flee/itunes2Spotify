import React from "react";
import { Button } from "reactstrap";
const request = require("request");
const cheerio = require("cheerio");

class webScraper extends React.Component {
    constructor(props){
        super(props);
        this.setState = {
            htmlBody: "Enter Dev mode to view loaded cheerio object",
            link: "https://music.apple.com/us/playlist/summer-2019/pl.u-b3b88DNfkj9gYd"
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
            <h1> iTunes -> Spotify Cheerio Test</h1>
            <Button color="success" onClick={this.iTunesDom}>CLICK ME</Button>
            <div>{this.state.htmlBody}</div>
          </div>
        );
    }
}

export default webScraper;