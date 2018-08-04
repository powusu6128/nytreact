const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require('morgan');
const path = require('path');
const routes = require("./routes");
const app = express();

// configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// set up logger
app.use(logger('combined'))
// serve up static assets
app.use(express.static(path.join(__dirname, "client/build")));
// set up routes
app.use(routes);


// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
);

// Start the API server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}...`);
});