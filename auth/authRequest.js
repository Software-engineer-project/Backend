module.exports = function authRequest(app, con) {
  return function (req, res, next) {
    con.query(
      `SELECT * FROM Auth WHERE Token = ${req.body}`,
      function (err, result) {
        if (err) {
          console.error("error connecting: " + err.stack);
          return;
        }
        next();
      }
    );
  };
};
