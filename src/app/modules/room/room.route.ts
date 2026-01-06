import express from 'express'
import { roomController } from './room.controller'
const router = express.Router()


router.post('/', roomController.insertIntoDB)
router.get('/', roomController.getAllRoom),
router.get('/:id', roomController.getRoomById)
router.patch('/:id', roomController.updateRoomById)
router.delete('/:id', roomController.deleteRoomByid)


export const roomRoute = router;