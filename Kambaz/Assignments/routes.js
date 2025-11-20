import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);
  
  // Helper function to check if user is faculty or admin
  const isFacultyOrAdmin = (user) => {
    return user && (user.role === "FACULTY" || user.role === "ADMIN");
  };
  
  // Callback functions
  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };
  
  const findAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignment(assignmentId);
    res.json(assignment);
  };
  
  const createAssignment = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!isFacultyOrAdmin(currentUser)) {
      res.status(403).json({ message: "Only faculty and admins can create assignments" });
      return;
    }
    
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  };
  
  const deleteAssignment = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!isFacultyOrAdmin(currentUser)) {
      res.status(403).json({ message: "Only faculty and admins can delete assignments" });
      return;
    }
    
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.json(status);
  };
  
  const updateAssignment = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!isFacultyOrAdmin(currentUser)) {
      res.status(403).json({ message: "Only faculty and admins can update assignments" });
      return;
    }
    
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = dao.updateAssignment(assignmentId, assignmentUpdates);
    res.json(status);
  };
  
  // Routes
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignment);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
}