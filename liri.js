
// LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

// require("dotenv").config();
//https://momentjs.com/docs/
var moment = require('moment');
// moment().format();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb_key = keys.omdb.api_key;
var bandsintown_key = keys.bandsintown.api_key;
var axios = require("axios");
var liri_commands = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]


// console.log(process.argv[2], process.argv[3]);

let user_command = process.argv[2];

let user_search_arry = []
for (i = 3; i < process.argv.length; i++) {
  user_search_arry.push(process.argv[i])
}
let user_search_str = user_search_arry.join(" ")
// console.log("A_user_search_str: ",user_search_str)


if (user_command == "concert-this") {
  get_band(user_search_str);
} else if (user_command == "spotify-this-song") {
  get_song(user_search_str);
} else if (user_command == "movie-this") {
  get_movie(user_search_str);
}else if (user_command == "do-what-it-says"){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    console.log(dataArr[1]);
    get_song(dataArr[1])
  });
}else{
  console.log("Invalid Input")
  console.log("Input should be:")
  console.log("node liri.js concert-this <artist/band name here> \n Or")
  console.log("node liri.js spotify-this-song '<song name here>' \n Or")
  console.log("node liri.js movie-this '<movie name here>' \n Or")
  console.log("node liri.js do-what-it-says")
}

function get_movie(movie){
  var search_string_arr = movie.split(" ")
  var search_string = search_string_arr.join("+")
  console.log("search_string: ", search_string)
  // We then run the request with axios module on a URL with a JSON
  axios.get("http://www.omdbapi.com/?t=" + search_string + "&y=&plot=short&apikey=" + omdb_key).then(
    function (response) {
      // Then we print out the imdbRating
      // console.log("response.data: " , response.data);
      console.log("Title of the movie:", response.data.Title)
      console.log("Year the movie came out:", response.data.Year)
      console.log("IMDB Rating of the movie:", response.data.imdbRating)
      console.log("Rotten Tomatoes Rating of the movie:", response.data.Ratings[1].Source, ": ", response.data.Ratings[1].Value)
      console.log("Country where the movie was produced:", response.data.Country)
      console.log("Language of the movie:", response.data.Language)
      console.log("Plot of the movie:", response.data.Plot)
      console.log("Actors in the movie:", response.data.Actors)



      console.log(" -------------------------------------------- ");
    }
  );
}

function get_band(band) {
  //https://rest.bandsintown.com/artists/foo+fighters/events/?app_id=4cf690ad-0a17-4b5d-b413-17e1ee6b6ea6
  var search_string_arr = band.split(" ")
  var search_string = search_string_arr.join("+")
  console.log("search_string: ", search_string)

  axios.get("https://rest.bandsintown.com/artists/"+search_string+"/events/?app_id=" + bandsintown_key).then(
    function (response) {
      // Then we print out the imdbRating
      // console.log(response.data[4]);
      console.log("Name of the venue: ", response.data[0].venue.name)
      console.log("Venue location: ", response.data[0].venue.city, "-", response.data[0].venue.region,"-" ,response.data[0].venue.country)
      console.log("Date of event: ", moment(response.data[0].datetime).format("LLLL"))
      console.log(" -------------------------------------------- ");
    }
  );
}



function get_song(song) {
  // console.log("song: ",song)
  var if_blank = "The Sign"
  if(song.length < 1){
    song = if_blank;
    console.log("No song provided, default is 'The Sign'")
  }
  spotify
    .search({ type: 'track', query: song })
    .then(function (response) {
      console.log("Artist: ", response.tracks.items[0].artists[0].name);
      console.log("Song: ", response.tracks.items[0].name);
      console.log("Preview link: ", response.tracks.items[0].preview_url);
      console.log("Album: ", response.tracks.items[0].album.name);
      console.log(" -------------------------------------------- ");
    })
    .catch(function (err) {
      console.log(err);
    });
}






// Make it so liri.js can take in one of the following commands:


// concert-this


// spotify-this-song


// movie-this


// do-what-it-says