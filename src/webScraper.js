import React from "react";
import { Button } from "reactstrap";
const request = require("request");
const cheerio = require("cheerio");

var song = function(songName, artist){
  this.songName = songName; 
  this.artist = artist;
}

var songLibrary = [];
var songLibraryInit= [];
var songLibraryFin= [];
// console.log(songLibrary);
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
            const $ = cheerio.load(html, {
              normalizeWhitespace: true,
              xmlMode: true
          });
            const playlistName = $('.product-header__title');
            const userName = $('.product-header__identity');
            const tracks = $('.tracklist-item__text');
            var songString = tracks.text();
            // console.log("the character at x is: " + songString.charAt(9));
            console.log(playlistName.html()); 
            console.log(userName.html());
            // console.log(songString);
            // console.log(songLibraryInit);
            var bag= ""; 
            var i;
            for(i=0; i< songString.length; i++){
              if(songString.charAt(i)!==" "){
                bag+= songString.charAt(i);
              }
              else if ((songString.charAt(i)===" ")&&(songString.charAt(i+1)===" ")){
                songLibraryInit.push(bag);
                bag = "";
              }
              else{
                bag+= " ";
              }
            }
            // console.log(songLibraryInit);
            for(i = 0;i<songLibraryInit.length;i++){
              if(songLibraryInit[i]!==""){
                songLibraryFin.push(songLibraryInit[i]);
              }
            }
            // console.log(songLibraryFin);
            var firstSong = new song('testSongName', 'testArtist');
            firstSong.songName = songLibraryFin[0];
            firstSong.artist = songLibraryFin[1];
            songLibrary.push(firstSong);
            for(i=2;i<(songLibraryFin.length);i++){
              if((i%2===0)){
                var music = new song(songLibraryFin[i], songLibraryFin[i+1]);
                // console.log("i is equal to : " + i);
                songLibrary.push(music);
              }
            }
            console.log(songLibrary);
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