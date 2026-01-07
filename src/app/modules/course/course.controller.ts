import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { courseService } from "./course.service";

const insertIntoDB = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
      const result = await courseService.insertIntoDB(req.body)
      console.log('result', result)
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Created course successfull!!",
        data: result
      }) 
})

const getAllCourse = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
      const result = await courseService.getAllCourse()
      console.log('result', result)
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrive course data successfull!!",
        data: result
      }) 
})

const getCourseById = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
      const result = await courseService.getCourseById(req.params.id)
      console.log('result', result)
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrive course data successfull!!",
        data: result
      }) 
})


const deleteCourseByid = catchAsync (async (req:Request, res: Response, next:NextFunction) => {
      const result = await courseService.deleteCourseByid(req.params.id)
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Delete course successfulll!!",
        data: result
      })
})

const updateOneInDB = catchAsync (async (req:Request, res:Response, next:NextFunction)=>{
    const result = await courseService.updateOneInDB(req.params.id, req.body)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Updated course successfull!!",
      data: result
    })
})


const facultyAssign = catchAsync (async (req:Request, res:Response, next:NextFunction)=>{
    const result = await courseService.assignFaculty(req.params.id, req.body.facalties)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculty assign successfull!!",
      data: result
    })
})


const removeFaculty = catchAsync (async (req:Request, res:Response, next:NextFunction)=>{
    const result = await courseService.removeFaculty(req.params.id, req.body.facalties)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Remove faculty course successfull!!",
      data: result
    })
})


export const courseController = {
    insertIntoDB,
    getAllCourse,
    getCourseById,
    deleteCourseByid,
    updateOneInDB,
    facultyAssign,
    removeFaculty
}