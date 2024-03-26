const express = require("express");
const connection = require("./config/db");
const app = express();
app.use(express.json());

app.post("/favourite/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "INSERT INTO favourites (id) VALUES (?)",
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({
            error: "An error occurred while saving the joke to the database",
          });
      } else {
        res.json({ message: "Joke saved successfully" });
      }
    }
  );
});

app.listen(3000, () => {
    try {
        connection.connect((err)=>{
            if(err){
                console.log('Not connected to DB');
            }else{
                console.log('Connected to DB');
            }
        })
    } catch (error) {
        console.log(error)
    }
  console.log("Server is running on port 3000");
});
