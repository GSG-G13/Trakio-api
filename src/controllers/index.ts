import { logout, loginController, signup } from './auth';
import {
  getProjects,
  deleteProject,
  getProjectByProjectId,
  addProjectController,
} from './project';
import { addTask, deleteTaskById, getTasks } from './task';
import getSections from './section';

export {
  loginController,
  logout,
  signup,
  getProjects,
  deleteProject,
  addTask,
  getTasks,
  getProjectByProjectId,
  deleteTaskById,
  addProjectController,
  getSections,
};
