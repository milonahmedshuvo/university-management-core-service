import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicDepartmentService } from "./academicDepartment.service";


const insertIntoToDB = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
    const result = await academicDepartmentService.insertIntoToDB(req.body)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Created Academic Department Successfull!!",
        data: result
    })
})


const getAllDataFromDB = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
      
    const filters = pick(req.query, ['searchTerm', 'title'])
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])

    const result = await academicDepartmentService.getAllDataFromDB(filters, options)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get All Academic Department Data!!",
        data: result
    })
})


const getDataById = catchAsync (async (req:Request, res:Response, next:NextFunction) => {
      const result = await academicDepartmentService.getDataById(req.params.id)
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Get Single Academic Department Data!',
        data: result
      })
})

export const academicDepartmentController = {
    insertIntoToDB,
    getAllDataFromDB,
    getDataById
}