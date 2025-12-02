import EnrollmentsDao from "./dao.js";
import UsersDao from "../Users/dao.js"; // You'll need this

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const usersDao = UsersDao(db);

  const enrollUserInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const status = dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(status);
  };

  // NEW: Get all users enrolled in a course
  const getUsersInCourse = async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await dao.findEnrollmentsForCourse(courseId);
    const userIds = enrollments.map(e => e.user);
    const users = await usersDao.findUsersByIds(userIds);
    res.json(users);
  };

  app.post("/api/courses/:courseId/enroll", enrollUserInCourse);
  app.delete("/api/courses/:courseId/enroll", unenrollUserFromCourse);
  app.get("/api/courses/:courseId/users", getUsersInCourse); // NEW ROUTE
}