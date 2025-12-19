import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
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



export const academicSemesterControllers = {
    insertToBD
}