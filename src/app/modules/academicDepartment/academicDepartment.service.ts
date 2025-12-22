import { AcademicDepartment } from "@prisma/client"
import { paginationHelpers } from "../../../helpers/paginationHelper"
import { IGenericResponse } from "../../../interfaces/common"
import { IPaginationOptions } from "../../../interfaces/pagination"
import prisma from "../../../shared/prisma"
import { IAcademicDepartmentFilters } from "./academicdepartment.constant"

const insertIntoToDB = async (academicDepartmentData:AcademicDepartment):Promise<AcademicDepartment> => {
      const result = await prisma.academicDepartment.create({data: academicDepartmentData})
      return result
}


const getAllDataFromDB = async (filters:IAcademicDepartmentFilters, options:IPaginationOptions):Promise<IGenericResponse<AcademicDepartment[]>> => {
     const {searchTerm, ...filtersData} = filters;
     const { page, limit, skip } = paginationHelpers.calculatePagination(options)

     const andConditions = []
     if(searchTerm){
        andConditions.push({
            OR: ['title'].map((key) => ({
                [key]: {
                    title: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
     }

     if(Object.keys(filtersData).length > 0){
       andConditions.push({
        AND: Object.keys(filtersData).map((key) => ({
            [key] : {
                equals: (filtersData as any)[key]
            }
        }))
       })
     }

     const whereConditions = andConditions.length > 0 ? {AND: andConditions} : {}
     const result = await prisma.academicDepartment.findMany({
        take: limit,
        skip,
        where: whereConditions,
        orderBy: options.sortBy && options.sortOrder ? { 
            [options.sortBy]: options.sortOrder
        }: {
            createAt: "desc"
        },
        include: {
            academicFaculty: true
        }
     })
     const total = await prisma.academicDepartment.count()

     return {
        meta: {
            total,
            page,
            limit
        },
        data: result
     }
}


const getDataById = async (id:string) => {
      const result = await prisma.academicDepartment.findUnique({
        where: {
            id: id
        },
        include : {
            academicFaculty: true
        }
      })
      return result
}


export const academicDepartmentService = {
    insertIntoToDB,
    getAllDataFromDB,
    getDataById
}