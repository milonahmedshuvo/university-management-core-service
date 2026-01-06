import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { buildingService } from "./building.service";

const insertIntoToDB = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
      const result = await buildingService.insertIntoToDB(req.body)
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Created building successfull!!",
        data: result
      })
})


const getAllDataFromDB = catchAsync(async (req:Request, res:Response, next:NextFunction) =>{
    const result = await buildingService.getAllDataFromDB()
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get all building successfull!!",
        data: result
      })
})

const getDatabyId = catchAsync(async (req:Request, res:Response, next:NextFunction) =>{
    const result = await buildingService.getDatabyId(req.params.id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get single building successfull!!",
        data: result
      })
})

const updateToCourseById = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
   const id = req.params.id
   const buildingData = req.body
   const result = await buildingService.updateToBuildingById(id, buildingData)
   sendResponse(res, {
    statusCode: 204,
    success: true,
    message: 'Updated building successfull!!',
    data: result
   })
})

const deleteBuildingById = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
  const result = await buildingService.deleteBuildingById(req.params.id)
  sendResponse(res, {
    statusCode: 204,
    success: true,
    message: 'Delete building successfull!!',
    data: result
  })
})


export const buildingController = {
    insertIntoToDB,
    getAllDataFromDB,
    getDatabyId,
    updateToCourseById,
    deleteBuildingById
}
