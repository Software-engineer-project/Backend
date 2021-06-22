// Library imports
const app = require("express")();
const sql = require("mysql2");

// Import different endpoint managers
const student = require("./student");
const professor = require("./professor");
const course = require("./course");

// Create MySQL connection
const con = sql.createConnection({
  host: "database",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Add default route to send the main endpoints
app.get("/", (req, res) => {
  res.send({
    students: "/students",
    professors: "/professors",
    courses: "/courses",
  });
});

// Register the endpoint managers with the express connection and mysql connection
student(app, con);
//professor(app, con);
//course(app, con);

// Makes application listen on appropriate port
app.listen(process.env.PORT || 8081, () => {
  console.log(`Starting express server...`);
});
