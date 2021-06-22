function handleLogin(con) {
  return function (req, res) {
    console.log(JSON.stringify(req));
  };
}

module.exports = function endpoint(app, con) {
  app.post("/login", handleLogin(con));
};
