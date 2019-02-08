//variables
var dotenv = require("dotenv").config();
var fs = require("fs");
var moment = require("moment");
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var args = process.argv;
var thisCommand = args[2];

var artist = "";
var movieName = "";
var title = "";


//make the application understand multiple word searches
function multiple() {
    for (var i = 3; i < args.length; i++) {
        if (i > 3 && i < args.length) {
            artist = artist + "+" + args[i];
            movieName = movieName + "+" + args[i];
            title = title + "+" + args[i];
        } else {
            artist += args[i];
            movieName += args[i];
            title += args[i];
        }
    };
};




//axios get function for bandsintown
function band() {
    if (thisCommand === "concert-this") {
        axios
            .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log("--------------------------------\n" + "\nThe following event was found for " + artist + ":" + "\nLocation: " + response.data[0].venue.city + ", " + response.data[0].venue.region +
                    "\nWhen: " + moment(response.data[0].datetime).format('MM/DD/YYYY') + "\nWhere: " + response.data[0].venue.name);

                console.log("--------------------------------\n");

            })

            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            })
    }

};


//axios get function for OMDB
function movie() {
    if (thisCommand === "movie-this") {
        axios
            .get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                console.log("--------------------------------\n" + "\nTitle: " + response.data.Title + "\nRelease Date: " + response.data.Released + "\nCountry of Production: " + response.data.Country +
                    "\nLanguage: " + response.data.Language + "\nActors and Actresses: " + response.data.Actors + "\nPlot: " + response.data.Plot +
                    "\nIMDB Rating: " + response.data.imdbrating);

                console.log("--------------------------------\n");

            })

            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            })
    }

}




//spotify request
function searchSong() {
    var spotify = new Spotify(keys.spotify);
    if (thisCommand === "spotify-this-song") {
        spotify.search({
                type: "track",
                query: title
            })
            .then(function (response) {
                console.log("--------------------------------\n" + "\nArtist: " + response.tracks.items[0].artists[0].name + "\nSong Name: " + response.tracks.items[0].name + "\nAlbum Name: " +
                    response.tracks.items[0].album.name + "\nListen Here: " + response.tracks.items[0].external_urls.spotify);

                console.log("--------------------------------\n");

            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            })
    }

}

multiple();
band();
movie();
searchSong();