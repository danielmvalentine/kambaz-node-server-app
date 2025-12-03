import model from "./model.js";

export default function AssignmentsDao() {
  const findAssignmentsForCourse = async (courseId) => {
    return await model.find({ course: courseId });
  };
  
  const createAssignment = async (assignment) => {
    const newAssignment = {
      ...assignment,
      _id: new Date().getTime().toString()
    };
    return await model.create(newAssignment);
  };
  
  const deleteAssignment = async (assignmentId) => {
    return await model.deleteOne({ _id: assignmentId });
  };
  
  const updateAssignment = async (assignmentId, assignmentUpdates) => {
    await model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
    return await model.findById(assignmentId);
  };
  
  const findAssignmentById = async (assignmentId) => {
    return await model.findById(assignmentId);
  };
  
  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
    findAssignmentById,
  };
}