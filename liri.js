//import dotenv package and configure
require("dotenv").config();

////import keys.js and store inside variable
var myKeys = require("key.js");

//access spotify key
var spotify = new Spotify(keys.spotify);