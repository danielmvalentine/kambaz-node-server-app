import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao(db);
  
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };
  
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    
    // If no userId in params, use current user from session
    if (!userId || userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
      
      // Faculty and Admin see ALL courses
      if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
        const courses = await dao.findAllCourses();
        res.json(courses);
        return;
      }
    }
    
    // Students see enrolled courses
    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };
  
  const findUsersForCourse = async (req, res) => {
    const { courseId } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(courseId);
    res.json(users);
  };
  
  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = await dao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  
  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  };
  
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };
  
  const enrollUserInCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.send(status);
  };
  
  const unenrollUserFromCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.send(status);
  };
  
  // Route declarations
  app.get("/api/courses/all", findAllCourses);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.get("/api/courses", findCoursesForEnrolledUser);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
  app.post("/api/users/current/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
}