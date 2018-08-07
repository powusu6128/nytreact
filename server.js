const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require('morgan');
const path = require('path');
const routes = require("./routes");
const app = express();

//setting up the database connection
const config = require('./config/databaseConnect');

mongoose.Promise = global.Promise;
mongoose.connect(config.database)
  .then(result => {
    console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`);
  })
  .catch(err => console.log('There was an error with your connection:', err)
);

// set up routes
app.use(routes);

// configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// set up logger for any alarm
app.use(morgan('combined',{
  skip: function (req, res) { return res.statusCode < 400 }
}));  

// serve up static assets
 app.use(express.static(path.join(__dirname, "client/build")));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"client/build")));
}


// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Start the API server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`API Server now listening on PORT ${PORT}...`);
});