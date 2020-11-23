const mysql = require("mysql");

var db_config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "escuela",
};

const connection = mysql.createConnection(db_config);

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("DB connected");
});

module.exports = connection;
