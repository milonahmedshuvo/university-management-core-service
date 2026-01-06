import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { roomService } from "./room.service";

const insertIntoDB = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
      const result = await roomService.insertIntoDB(req.body)
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Room Created Successfull!!",
        data: result
      })
})

const getAllRoom = catchAsync(async(req:Request, res:Response, next:NextFunction) =>{
    const filters = pick(req.query, ['roomNumber', 'floor', 'searchTerm'])
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
    
    const result = await roomService.getAllRoom(filters, options)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get Room Data Retrive!!",
        data: result
    })
})

const getRoomById = catchAsync(async(req:Request, res:Response, next:NextFunction) =>{
    const result = await roomService.getRoomById(req.params.id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Room data retrive successfull!!",
        data: result
    })
})

const updateRoomById = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const result = await roomService.updateRoomById(req.params.id, req.body)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Room update successfull!!",
        data: result
    })
})

const deleteRoomByid = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const result = await roomService.deleteRoomById(req.params.id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Room delete Successfull!!",
        data: result
    })
})




export const roomController = {
    insertIntoDB,
    getAllRoom,
    getRoomById,
    updateRoomById,
    deleteRoomByid
}