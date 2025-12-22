import { AcademicFaculty } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicFacultyFilters } from './academicFaculty.constant';

const insertIntoToBD = async (
  academicFacultyData: AcademicFaculty
): Promise<AcademicFaculty> => {

    console.log("academic faculty", academicFacultyData )
  const result = await prisma.academicFaculty.create({
    data: academicFacultyData,
  });
  return result;
};

const getAllDataFromDB = async (filters:AcademicFacultyFilters, options:IPaginationOptions): Promise<IGenericResponse<AcademicFaculty[]>> => {
      const { searchTerm, ...filtersData } = filters;
      const { page, limit, skip } = paginationHelpers.calculatePagination(options)

       const andConditions: any = []

       if(searchTerm){
          andConditions.push({
            OR: ['title'].map((filed) => ({
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

     const whereConditions = andConditions.length > 0 ? {AND: andConditions} : {}


      const result = await prisma.academicFaculty.findMany({
        skip,
        take: limit,
        where: whereConditions
      });
      const total = await prisma.academicFaculty.count({where: whereConditions})

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result,
  };
};


const getDataById = async (id: string) => {
    const result = await prisma.academicFaculty.findUnique({
        where: {
            id
        }
    })
    
    return result;
}



export const academicFacultyService = {
  insertIntoToBD,
  getAllDataFromDB,
  getDataById
};
