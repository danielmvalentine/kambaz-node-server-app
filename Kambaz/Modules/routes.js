import ModulesDao from "./dao.js";

export default function ModuleRoutes(app, db) {
  const dao = ModulesDao();
  
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  };
  
  const createModule = async (req, res) => {
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
    const newModule = await dao.createModule(courseId, module);
    res.json(newModule);
  };
  
  const updateModule = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Only faculty and admins can update modules" });
      return;
    }
    const { courseId, moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await dao.updateModule(courseId, moduleId, moduleUpdates);
    res.send(status);
  };
  
  const deleteModule = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || (currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN")) {
      res.status(403).json({ message: "Only faculty and admins can delete modules" });
      return;
    }
    const { courseId, moduleId } = req.params;
    const status = await dao.deleteModule(courseId, moduleId);
    res.send(status);
  };
  
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModule);
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
}