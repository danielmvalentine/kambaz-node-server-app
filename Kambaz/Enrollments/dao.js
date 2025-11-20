export default function EnrollmentsDao(db) {
    const { enrollments } = db;
    
    const enrollUserInCourse = (userId, courseId) => {
      const newEnrollment = {
        _id: Date.now().toString(),
        user: userId,
        course: courseId,
      };
      enrollments.push(newEnrollment);
      return newEnrollment;
    };
    
    const unenrollUserFromCourse = (userId, courseId) => {
      db.enrollments = enrollments.filter(
        (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
      );
      return { status: "ok" };
    };
    
    const findEnrollmentsForUser = (userId) => {
      return enrollments.filter((enrollment) => enrollment.user === userId);
    };
    
    const findEnrollmentsForCourse = (courseId) => {
      return enrollments.filter((enrollment) => enrollment.course === courseId);
    };
    
    return {
      enrollUserInCourse,
      unenrollUserFromCourse,
      findEnrollmentsForUser,
      findEnrollmentsForCourse,
    };
  }