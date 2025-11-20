export default function CoursesDao(db) {
    const { courses } = db;
    
    const findAllCourses = () => {
      return courses;
    };
    
    const findCoursesForEnrolledUser = (userId) => {
      const { enrollments } = db;
      const enrolledCourses = courses.filter((course) =>
        enrollments.some((enrollment) => 
          enrollment.user === userId && enrollment.course === course._id
        )
      );
      return enrolledCourses;
    };
    
    const createCourse = (course) => {
      const newCourse = { ...course, _id: Date.now().toString() };
      courses.push(newCourse);
      return newCourse;
    };
    
    const deleteCourse = (courseId) => {
      const index = courses.findIndex((course) => course._id === courseId);
      if (index !== -1) {
        courses.splice(index, 1);
      }
      return { status: "ok" };
    };
    
    const updateCourse = (courseId, courseUpdates) => {
      const course = courses.find((course) => course._id === courseId);
      Object.assign(course, courseUpdates);
      return course;
    };
    
    return { 
      findAllCourses,
      findCoursesForEnrolledUser, 
      createCourse, 
      deleteCourse, 
      updateCourse 
    };
  }