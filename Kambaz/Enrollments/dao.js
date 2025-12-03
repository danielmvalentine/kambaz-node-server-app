import model from "./model.js";

export default function EnrollmentsDao(db) {
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }
  
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    console.log("Found enrollments for course:", courseId);
    console.log("Enrollments:", enrollments);
    console.log("Users:", enrollments.map(e => e.user));
    return enrollments.map((enrollment) => enrollment.user);
  }
  
  async function enrollUserInCourse(userId, courseId) {
    // Check if already enrolled
    const existing = await model.findOne({ user: userId, course: courseId });
    if (existing) {
      return existing; // Already enrolled, return existing enrollment
    }
    
    // Create new enrollment
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }
  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }
  
  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }
  
  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}