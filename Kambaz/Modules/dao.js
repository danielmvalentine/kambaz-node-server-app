export default function ModulesDao(db) {
    const { modules } = db;
    
    const findModulesForCourse = (courseId) => {
      return modules.filter((module) => module.course === courseId);
    };
    
    const createModule = (module) => {
      const newModule = { ...module, _id: Date.now().toString() };
      modules.push(newModule);
      return newModule;
    };
    
    const deleteModule = (moduleId) => {
      const { modules } = db;
      db.modules = modules.filter((module) => module._id !== moduleId);
      return { status: "ok" };
    };
    
    const updateModule = (moduleId, moduleUpdates) => {
      const { modules } = db;
      const module = modules.find((module) => module._id === moduleId);
      Object.assign(module, moduleUpdates);
      return module;
    };
    
    return { 
      findModulesForCourse, 
      createModule, 
      deleteModule, 
      updateModule 
    };
  }