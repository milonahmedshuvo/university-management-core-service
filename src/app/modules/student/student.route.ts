import express from 'express';
import { studentController } from './student.controller';

const router = express.Router()

router.post('/', studentController.insertIntoToDB)
router.patch('/:id', studentController.updateIntoDB)
router.get('/', studentController.getAllDataFromDB)
router.get('/:id', studentController.getDataByIdFromDB)

export const studentRoute = router;