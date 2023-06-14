import express, { Router } from 'express'
import { getMembersByProjectId } from '../controllers'
import { authCheck } from '../middleware'

const membersRouter: Router = express.Router()

membersRouter.get('/project/members', authCheck, getMembersByProjectId)

export default membersRouter;
