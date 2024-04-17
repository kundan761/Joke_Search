const mysql = require("mysql");
const db = require("../config/db");

const table = (req, res, next)=>{
    const sql = `CREATE TABLE IF NOT EXISTS jokes(
        id INT AUTO_INCREMENT PRIMARY KEY,
        joke_id VARCHAR(255) NOT NULL,
        joke_text TEXT NOT NULL
    )`;

    db.query(sql, [], (err, result)=>{
        if(err){
            console.log("we got the error");
        }else if(result){
            next();
        }
    })
}

module.exports = table;