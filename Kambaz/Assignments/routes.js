import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao();
  
  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };
  
  const findAssignmentById = async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };
  
  const createAssignment = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Only faculty and admins can create assignments" });
      return;
    }
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await dao.createAssignment(assignment);
    res.json(newAssignment);
  };
  
  const updateAssignment = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Only faculty and admins can update assignments" });
      return;
    }
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await dao.updateAssignment(assignmentId, assignmentUpdates);
    res.json(status);
  };
  
  const deleteAssignment = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Only faculty and admins can delete assignments" });
      return;
    }
    const { assignmentId } = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.json(status);
  };
  
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
}