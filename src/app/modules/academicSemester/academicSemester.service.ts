import { AcademicSemester } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";

const insertToBD = async (academicSemester:AcademicSemester):Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.create({data: academicSemester})
    return result;
}

const getAllFromDB = async (filters, options: IPaginationOptions):Promise<IGenericResponse <AcademicSemester[]> > => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options)
    const result = await prisma.academicSemester.findMany({
        skip,
        take: limit
    })
    const total = await prisma.academicSemester.count()

    return{
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

export const academicSemesterServices = {
    insertToBD,
    getAllFromDB
}