import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "./user.service";



const insertToBD = async (req:Request, res:Response, next: NextFunction) => {

     try{
        const result = await userServices.insertToDB(req.body)
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Create User Successfull!!",
            data: result
        })
     }catch(err){
        next(err)
     }
}


const getAllUsers = async (req:Request, res:Response, next: NextFunction) => {

     try{
        const result = await userServices.getAllUsersFromDB()
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Retrive User Successfull!!",
            data: result
        })
     }catch(err){
        next(err)
     }
}


export const userControllers = {
    insertToBD,
    getAllUsers
}