const express = require("express");
const connection = require("./config/db");
const fav = require("./routes/fav.routes");
const table = require("./middlewares/table")
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors());

app.use("/favourites",table, fav);

app.listen(3000, () => {
    try {
        connection.connect((err)=>{
            if(err){
                console.log(err);
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
