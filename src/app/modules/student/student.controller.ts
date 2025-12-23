import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { studentService } from "./student.service";

const insertIntoToDB = catchAsync(async(req:Request, res:Response, next:NextFunction) =>{
    const result = await studentService.insertIntoToDB(req.body)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Created Student Successfull!!",
        data: result
    })
})

const getAllDataFromDB = catchAsync(async(req:Request, res:Response, next:NextFunction) =>{
    const result = await studentService.getAllDataFromDB()
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Gel All Student Successfull!!",
        data: result
    })
})

const getDataByIdFromDB = catchAsync(async(req:Request, res:Response, next:NextFunction) =>{
    const result = await studentService.getDataByIdFromDB(req.params.id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Gel Single Student Successfull!!",
        data: result
    })
})

export const studentController = {
      insertIntoToDB,
      getAllDataFromDB,
      getDataByIdFromDB
}