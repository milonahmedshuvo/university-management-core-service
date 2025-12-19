import { AcademicSemester } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertToBD = async (academicSemester:AcademicSemester):Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.create({data: academicSemester})
    return result;
}



export const academicSemesterServices = {
    insertToBD
}