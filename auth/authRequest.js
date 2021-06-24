module.exports = function authRequest(app, con) {
  return function (req, res, next) {
    if (req.body.Token) {
      console.log(req.body.Token);
      con.query(
        `SELECT * FROM Auth WHERE Token = ${req.body.Token}`,
        function (err, result) {
          if (err) {
            console.error("error connecting: " + err.stack);
            return;
          }
          console.log(result);
          next();
        }
      );
    } else {
      res.status(403).end(); // Bad permission
    }
  };
};
