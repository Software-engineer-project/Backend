const md5 = require("md5");
const crypto = require("crypto");

function handleLogin(con) {
  return function (req, res) {
    if (req.body && req.body.email && req.body.password) {
      con.query(
        `SELECT * FROM User WHERE Email = '${req.body.email}'
        AND Password = '${md5(req.body.password)}'`,
        function (err, result) {
          if (err) {
            console.error("error connecting: " + err.stack);
            res.send("Error connecting to database: " + err.stack);
            return;
          }
          if (result.length == 1) {
            var token = crypto.randomBytes(64).toString("hex");
            const user = {
              UserID: result[0].UserID,
              University: result[0].University,
              Email: result[0].Email,
              FirstName: result[0].FirstName,
              LastName: result[0].LastName,
              IsProfessor: result[0].IsProfessor,
              Token: token,
            };
            con.query(
              `REPLACE INTO Auth (UserID, Token) VALUES (${result[0].UserID}, '${token}')`,
              function (err, result) {
                if (err) {
                  console.error("error connecting: " + err.stack);
                  res.send("Error generating token: " + err.stack);
                  return;
                }
                res.send(user);
              }
            );
          } else {
            res.send({
              code: "401",
            });
          }
        }
      );
    } else {
      res.send({
        code: "401",
      });
    }
  };
}

module.exports = function endpoint(app, con) {
  app.post("/login", handleLogin(con));
};
