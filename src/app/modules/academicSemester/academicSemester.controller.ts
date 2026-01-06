import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicSemesterServices } from "./academicSemester.service";

const insertToBD = catchAsync(async (req:Request, res:Response, next:NextFunction)=> {
    const result = await academicSemesterServices.insertToBD(req.body)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Created Academic Semester!!",
        data: result
    })
}) 


const getAllFromDB = catchAsync(async (req:Request, res:Response, next:NextFunction)=> {

    const filters = pick(req.query, ['year', 'code', 'searchTerm', 'startMonth', 'endMonth'])
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
    // console.log("filters", filters)
    // console.log("options", options)
    const result = await academicSemesterServices.getAllFromDB(filters, options)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get Academic Semester Data!!",
        data: result
    })
})


const getDataById = catchAsync(async (req:Request, res:Response, next:NextFunction)=> {
    const result = await academicSemesterServices.getDataById(req.params.id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get Single Academic Semester Data!!",
        data: result
    })
})

export const academicSemesterControllers = {
    insertToBD,
    getAllFromDB,
    getDataById
}