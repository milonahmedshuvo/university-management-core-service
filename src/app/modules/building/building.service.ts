import { Building } from "@prisma/client"
import { IGenericResponse } from "../../../interfaces/common"
import prisma from "../../../shared/prisma"

const insertIntoToDB = async (buildingData:Building):Promise<Building> => {
    const result = await prisma.building.create({
        data: buildingData,
        include: {
            rooms: true
        }
    })
    return result
}

const getAllDataFromDB = async ():Promise<IGenericResponse<Building[]>> => {
    const result = await prisma.building.findMany({
        include:{
            rooms: true
        }
    })

    return {
        meta: {
            total: 100,
            page : 1,
            limit: 10
        },
        data: result
    }
}

const getDatabyId = async (id:string):Promise<Building | null > => {
    const result = await prisma.building.findUnique({
        where : {
            id
        }
    })

    return result;
}


const updateToBuildingById = async (id:string, payload:Partial<Building>):Promise<Building> => {
      const result = await prisma.building.update({
        where: {
            id: id
        },
        data: payload
      })

      return result
}

const deleteBuildingById = async (id: string):Promise<Building> => {
    const result = await prisma.building.delete({
        where: {
            id: id
        }
    })
    return result
}


export const buildingService = {
    insertIntoToDB,
    getAllDataFromDB,
    getDatabyId,
    updateToBuildingById,
    deleteBuildingById
}