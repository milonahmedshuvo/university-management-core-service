import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicFacultyService } from "./academicFaculty.service";

const insertIntoToBD = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const result = await academicFacultyService.insertIntoToBD(req.body)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Created Academic Faculty!!",
        data: result
    })
})

const getAllDataFromDB = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
      const filters = pick(req.query, ['searchTerm', 'title'])
      const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
      
      const result = await academicFacultyService.getAllDataFromDB(filters, options)
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get All Academic Faculty Data!!",
        data: result
      })
})

const getDataById = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
      const result = await academicFacultyService.getDataById(req.params.id)
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get Single Academic Faculty Data!!",
        data: result
      })
})


export const academicFacultyController = {
    insertIntoToBD,
    getAllDataFromDB,
    getDataById
}