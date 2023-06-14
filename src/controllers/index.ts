import { logout, loginController, signup } from './auth';
import {
  getProjects,
  deleteProject,
  getProjectByProjectId,
  addProjectController,
} from './project';
import {
  addTask, deleteTaskById, getTasks, getTasksByProjectAndSection,
} from './task';
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
  getTasksByProjectAndSection,
  getSections,
};
