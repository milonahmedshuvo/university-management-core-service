import { Faculty } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";


const insertIntoToDB = async (facultyData:Faculty) => {
    const result = await prisma.faculty.create({data: facultyData})
    return result
}

const getAllDataFromDB = async (filters: { searchTerm?: string}, options:IPaginationOptions):Promise<IGenericResponse<Faculty[]>> => {
    const {searchTerm, ...filtersData} = filters;
    const { page, limit, skip } = paginationHelpers.calculatePagination(options)

    const andConditions = []
    if(searchTerm){
        andConditions.push({
            OR: ['firstName','email', 'gender'].map((filed) => ({
                [filed] : {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if(Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map((key) => ({
                [key] : {
                    equals: (filtersData as any)[key]
                }
            }))
        })
    }

    const whereConditions = andConditions?.length > 0 ? {AND: andConditions} : {}


    const result = await prisma.faculty.findMany({
        skip,
        take: limit,
        where: whereConditions,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        }: {
            createAt: "desc"
        },
        include: {
            academicDepartment: true,
            academicFaculty: true
        }
    })
    const total = await prisma.faculty.count()

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getDataByIdFromDB = async (id: string) => {
    const result = await prisma.faculty.findUnique({
        where : {
            id
        },
        include : {
            academicDepartment: true,
            academicFaculty: true
        }
    })
    return result
}

export const facultyService = {
    insertIntoToDB,
    getAllDataFromDB,
    getDataByIdFromDB
}