import { Room } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IRoomFiltersRequired } from "./room.constent";

const insertIntoDB = async (payload:Room):Promise<Room> => {
    const result = prisma.room.create({
        data: payload, 
        include: {
            building: true
        }})
    return result
}

const getAllRoom = async (filters:IRoomFiltersRequired, options:IPaginationOptions):Promise<IGenericResponse<Room[]>> => {
      const {searchTerm, ...filterData} = filters;
      const {page, limit, skip} = paginationHelpers.calculatePagination(options)

      const andCondition = []
      
      if(searchTerm){
        andCondition.push({
            OR: ['roomNumber', 'floor'].map((filed) => ({
                [filed]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
      }

      if(Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
               [key]: {
                 equals: (filterData as any )[key]
               }
            }))
        })
      }

     const whereConditions = andCondition.length > 0 ? {AND: andCondition} : {}


    const result = await prisma.room.findMany({
        where:whereConditions,
        take: limit,
        skip: skip,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        }: {
            'createAt': 'desc'
        },
        include:{
            building: true
        }
    })
    
    const total = await prisma.room.count({where: whereConditions})

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getRoomById = async (id:string):Promise<Room | null> => {
    const result = await prisma.room.findUnique({
        where: {
            id: id
        },
    })
    return result
}

const updateRoomById = async(id:string, payload:Partial<Room>) => {
    const result = await prisma.room.update({
        where: {
            id: id
        },
        data: payload
    })

    return result
}

const deleteRoomById = async (id:string) => {
    const result = await prisma.room.delete({
        where: {
            id:id
        }
    })
    
    return result;
}


export const roomService = {
    insertIntoDB,
    getAllRoom,
    getRoomById,
    updateRoomById,
    deleteRoomById
}