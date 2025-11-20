export default function AssignmentsDao(db) {
    const { assignments } = db;
    
    const findAssignmentsForCourse = (courseId) => {
      return assignments.filter((assignment) => assignment.course === courseId);
    };
    
    const createAssignment = (assignment) => {
      const newAssignment = { ...assignment, _id: Date.now().toString() };
      assignments.push(newAssignment);
      return newAssignment;
    };
    
    const deleteAssignment = (assignmentId) => {
      const { assignments } = db;
      db.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
      return { status: "ok" };
    };
    
    const updateAssignment = (assignmentId, assignmentUpdates) => {
      const { assignments } = db;
      const assignment = assignments.find((assignment) => assignment._id === assignmentId);
      Object.assign(assignment, assignmentUpdates);
      return assignment;
    };
    
    const findAssignment = (assignmentId) => {
      return assignments.find((assignment) => assignment._id === assignmentId);
    };
    
    return { 
      findAssignmentsForCourse, 
      createAssignment, 
      deleteAssignment, 
      updateAssignment,
      findAssignment
    };
  }