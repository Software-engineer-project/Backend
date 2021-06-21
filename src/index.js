const app = require("express")();

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const sql = require("mysql2");

const database_name = process.env.MYSQL_DATABASE;
const database_password = process.env.MYSQL_ROOT_PASSWORD;

const con = sql.createConnection({
  host: "database",
  port: 3306,
  user: "root",
  password: database_password,
  database: database_name,
});

app.get("/", (req, res) => {
  con.query("SELECT * FROM User", function (err, result) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    res.send(result);
  });
});

app.get("/courses", (req, res) => {
  con.query("SELECT * FROM Course", function (err, result) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    res.send(result);
  });
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`apps is listening on http://localhost:${port}`);
});
