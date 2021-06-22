// Should have following endpoints:
//  [x] /students/id/:userid = Find student by userid
//   [] /students/id/:userid/courses = Get courses enrolled in by student with userid
//  [x] /students/all = Get all students
//   [] /students/all/:university = Get all students that attend a specific university
//  [x] /students = List endpoints

// /students
// Lists all the endpoints owned by the students associated endpoints
function getStudentEndpoints() {
  return function (req, res) {
    res.send({
      GetStudentByID: "/students/id/:id",
      GetStudentCourses: "/students/id/:id/courses",
      GetAllStudents: "/students/all",
      GetAllStudentsByUni: "/students/all/:university",
    });
  };
}

// /students/all
// Lists all students in the database
function getAllStudents(con) {
  return function (req, res) {
    con.query(
      "SELECT * FROM User WHERE IsProfessor = FALSE",
      function (err, result) {
        if (err) {
          console.error("error connecting: " + err.stack);
          return;
        }
        res.send(result);
      }
    );
  };
}

// /students/id/:userid
// Selects a student by a specific userid
function selectStudentByID(con) {
  return function (req, res) {
    con.query(
      "SELECT * FROM User WHERE IsProfessor = FALSE AND UserID = " +
        req.params.userid,
      function (err, result) {
        if (err) {
          console.error("error connecting: " + err.stack);
          return;
        }
        res.send(result);
      }
    );
  };
}

// /students/id/:userid/courses
// Gets the courses the student is inlisted in
function getUserCourses(con) {
  return function (req, res) {
    // TODO get the courses associated with the user
    res.send("temp");
  };
}

// Exports the endpoint manager
module.exports = function endpoint(app, con) {
  app.get("/students/id/:userid", selectStudentByID(con));
  app.get("/students/id/:userid/courses", getUserCourses(con));
  app.get("/students/all", getAllStudents(con));
  app.get("/students", getStudentEndpoints(con));
};
