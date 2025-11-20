export default function UsersDao(db) {
  const { users } = db;
  
  const findUserByCredentials = (username, password) => {
    return users.find((user) => user.username === username && user.password === password);
  };
  
  const findUserByUsername = (username) => {
    return users.find((user) => user.username === username);
  };
  
  const findUserById = (userId) => {
    return users.find((user) => user._id === userId);
  };
  
  const createUser = (user) => {
    const newUser = { 
      ...user, 
      _id: Date.now().toString(),
      role: user.role || "STUDENT"  // Default to STUDENT if no role provided
    };
    users.push(newUser);
    return newUser;
  };
  
  const updateUser = (userId, userUpdates) => {
    const user = users.find((user) => user._id === userId);
    if (user) {
      Object.assign(user, userUpdates);
    }
    return user;
  };
  
  const deleteUser = (userId) => {
    const index = users.findIndex((user) => user._id === userId);
    if (index !== -1) {
      users.splice(index, 1);
    }
    return { status: "ok" };
  };
  
  return {
    findUserByCredentials,
    findUserByUsername,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}