const uriConstants = {
  CLIENT_ID: "08f46a77cd954c4d85850f76690146d3",
  CLIENT_SECRET: "ab192b2513fc4557b82f7e681bc1fda0",
  // REDIRECTURL:
  //  "http://itunes2spotify-20190826194208-hostingbucket-dev.s3-website-us-east-1.amazonaws.com/",
  //REDIRECTURL: "http://localhost:3000/playListCreation",
  //REDIRECTURL: "https://murmuring-plains-67099.herokuapp.com/playListCreation",
  REDIRECTURL: "https://itunes-2-spotify.herokuapp.com/playListCreation",
  //REDIRECTURL: "https://symp-dcc1f.firebaseapp.com/playListCreation",

  FULL_PLAYLIST_AND_TRACK_MOD:
    "playlist-modify-public%20playlist-modify-private%20user-library-modify",
  USER_DATA_URL: "https://api.spotify.com/v1/me",
  BASE_URL: "https://api.spotify.com",
  SONG_SERVICE: "https://symp2.herokuapp.com/itunes/scrape"
};

export default uriConstants;
