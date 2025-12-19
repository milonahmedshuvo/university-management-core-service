import express from 'express'
import { userControllers } from './user.controller'

const router = express.Router()

router.post('/', userControllers.insertToBD)
router.get('/', userControllers.getAllUsers)


export const userRoutes = router