require("dotenv").config();

//grab packages
var axios = require("axios");
var NodeSpotify = require("node-spotify-api");


////import keys.js and store inside variable
var keys = require("key.js");

//access spotify key
var spotify = new Spotify(keys.spotify);


//axios get function for bandsintown
function band() {
    //define user input
    var artist = process.argv;
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            if (error.response) {
                console.log(error.response);
            }
        })
};


//axios get function for OMDB
function movie() {
    //define user input
    var movieName = process.argv;
    axios
    .get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        if (error.response) {
            console.log(error.response);
        }
    })
} 

function song() {
    //define user input 
    var song = process.argv;
    spotify.search({type: "track", query:song})
    .then(function(response) {
        console.log(response);
    })
}
