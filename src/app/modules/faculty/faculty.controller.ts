import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { facultyService } from "./faculty.service";

const insertIntoToDB = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
    const result = await facultyService.insertIntoToDB(req.body)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Created Faculty Successfull!!",
        data: result
    })
})

const getAllDataFromDB = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
     const filters = pick(req.query, ['searchTerm', 'firstName', 'email', 'gender'])
     const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])

    const result = await facultyService.getAllDataFromDB(filters, options)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get All Faculty Successfull!!",
        data: result
    })
})

const getDataByIdFromDB = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
    const result = await facultyService.getDataByIdFromDB(req.params.id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrive Single Faculty Successfull!!",
        data: result
    })
})


export const facultyController = {
      insertIntoToDB,
      getAllDataFromDB,
      getDataByIdFromDB
}