// console.log('this is loaded');
require("dotenv").config();

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsintown = {
  api_key: process.env.bandsintown_KEY
};

exports.omdb = {
  api_key: process.env.OMDB_API_KEY
};
