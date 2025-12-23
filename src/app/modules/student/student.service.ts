import { Student } from "@prisma/client"
import { paginationHelpers } from "../../../helpers/paginationHelper"
import { IGenericResponse } from "../../../interfaces/common"
import { IPaginationOptions } from "../../../interfaces/pagination"
import prisma from "../../../shared/prisma"
import { StudentFilterOptions } from "./student.constant"

const insertIntoToDB = async (studentData: Student) => {
      const result = await prisma.student.create({data: studentData})
      return result
}

const getAllDataFromDB = async ( filters:StudentFilterOptions, options:IPaginationOptions ):Promise<IGenericResponse<Student[]>> => {
      const { searchTerm, ...filtersData } = filters
      const {page, limit, skip} = paginationHelpers.calculatePagination(options)

      const andConditons = []
      if(searchTerm){
        andConditons.push({
            OR: ['firstName', 'email', 'gender'].map((filed)=> ({
                [filed] : {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
      }

      if(Object.keys(filtersData).length > 0) {
         andConditons.push({
            AND: Object.keys(filtersData).map((key) => ({
                [key] : {
                    equals: (filtersData as any)[key]
                }
            }))
         })
      }

      const whereConditions = andConditons.length > 0 ? {AND: andConditons} : {}
      
      const result = await prisma.student.findMany({
        skip,
        take: limit,
        where: whereConditions,
        include: {
            academicSemester: true,
            academicDepartment: true,
            academicFaculty: true
        }
    })
    const total = await prisma.student.count()

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
} 

const getDataByIdFromDB = async (id:string):Promise< Student | null > => {
    const result = await prisma.student.findUnique({
        where: {
            id
        },
        include: {
            academicSemester: true,
            academicDepartment: true,
            academicFaculty: true
        }
    })
    return result
};


export const studentService = {
    insertIntoToDB,
    getAllDataFromDB,
    getDataByIdFromDB
}