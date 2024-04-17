const express = require("express");
const fav = express.Router();
const connection = require("../config/db");

fav.get("/", (req, res) => {
  const sql = "SELECT * FROM jokes";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching favorite jokes: " + err.message);
      res.status(500).send("Error fetching favorite jokes");
      return;
    }
    res.json(results);
  });
});

fav.post("/:id", (req, res) => {
    const jokeId = req.params.id;
    const jokeText = req.body.jokeText; // Adjusted to match the request body format
    const sql = "INSERT INTO jokes (joke_id, joke_text) VALUES (?, ?)";
    connection.query(sql, [jokeId, jokeText], (err, results) => {
      if (err) {
        console.error("Error storing favorite joke: " + err.message);
        res.status(500).send("Error storing favorite joke");
        return;
      }
      res.status(200).send("Favorite joke stored successfully");
    });
  });

module.exports = fav