const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { response } = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express(); // Create a new express application
app.use(cors()); //Enable All CORS Requests
app.use(bodyParser.json()); // parse application/json

//when a GET request is made to the "/getAccessToken"
app.get("/getAccessToken", async (req, res) => {
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

//get user data
app.get("/getUserData", async (req, res) => {
  return await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), //Bearer access token
    },
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    });
});

//get repo data
app.get("/getRepoData", async (req, res) => {
  return await fetch("https://api.github.com/issues?filter=all&state=all", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), //Bearer access token
    },
  })
    .then((response) => response.json())
    .then((data) => res.json(data));
});

app.listen(4000, function () {
  console.log("Listening on 4000");
});
