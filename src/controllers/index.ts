import { logout, loginController, signup } from './auth';
import { getProjects, deleteProject, getProjectByProjectId } from './project';
import addTask from './task';

export {
  loginController, logout, signup, getProjects, deleteProject, addTask, getProjectByProjectId,
};
