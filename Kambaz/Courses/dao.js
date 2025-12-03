import model from "./model.js";

export default function CoursesDao() {
  const findAllCourses = async () => {
    return await model.find();
  };
  
  const createCourse = async (course) => {
    const newCourse = { 
      ...course, 
      _id: new Date().getTime().toString() // Generate ID based on timestamp
    };
    const created = await model.create(newCourse);
    return created;
  };
  
  const deleteCourse = async (courseId) => {
    return await model.deleteOne({ _id: courseId });
  };
  
  const updateCourse = async (courseId, courseUpdates) => {
    await model.updateOne({ _id: courseId }, { $set: courseUpdates });
    return await model.findById(courseId);
  };
  
  return { 
    findAllCourses,
    createCourse, 
    deleteCourse, 
    updateCourse 
  };
}