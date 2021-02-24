const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const peopleRoutes = require("./route/people");
const app = express();

// ESTABLISHING DATABASE CONNECTIONS

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use("/", express.static(path.join(__dirname, "redspace")));

// IF BACKEND AND FRONTEND ARE HOSTED SEPERATELY

 app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   res.setHeader(
     "Access-Control-Allow-Methods",
     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
   );
   next();
});

app.use("/api/people", peopleRoutes);
/*
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});
*/

module.exports = app;