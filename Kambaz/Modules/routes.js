import ModulesDao from "./dao.js";

export default function ModuleRoutes(app, db) {
  const dao = ModulesDao(db);
  
  // Callback functions at the top
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  };
  
  const createModule = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Only faculty and admins can create modules" });
      return;
    }
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = dao.createModule(module);
    res.json(newModule);
  };
  
  const updateModule = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Only faculty and admins can update modules" });
      return;
    }
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = dao.updateModule(moduleId, moduleUpdates);
    res.json(status);
  };
  
  const deleteModule = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Only faculty and admins can delete modules" });
      return;
    }
    const { moduleId } = req.params;
    const status = dao.deleteModule(moduleId);
    res.json(status);
  };
  
  // Route declarations at the bottom
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModule);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}