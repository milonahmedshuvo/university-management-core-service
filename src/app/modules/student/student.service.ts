import { Student } from "@prisma/client"
import { IGenericResponse } from "../../../interfaces/common"
import prisma from "../../../shared/prisma"

const insertIntoToDB = async (studentData: Student) => {
      const result = await prisma.student.create({data: studentData})
      return result
}

const getAllDataFromDB = async ():Promise<IGenericResponse<Student[]>> => {
    const result = await prisma.student.findMany({
        include: {
            academicSemester: true,
            academicDepartment: true,
            academicFaculty: true
        }
    })

    return {
        meta: {
            total: 30,
            page: 2,
            limit: 2
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