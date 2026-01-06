import express from 'express'
import { buildingController } from './building.controller'

const router = express.Router()

router.post('/', buildingController.insertIntoToDB)
router.get('/', buildingController.getAllDataFromDB)
router.get('/:id', buildingController.getDatabyId)
router.patch('/', buildingController.updateToCourseById)
router.delete('/', buildingController.deleteBuildingById)


export const buildingsRoute = router

