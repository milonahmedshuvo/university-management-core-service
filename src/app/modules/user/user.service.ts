import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';



const insertToDB = async (userData:User) => {
  return prisma.user.create({
    data: userData,
  });
};


const getAllUsersFromDB = async () => {
    const result = await prisma.user.findMany()
    return result
}





export const userServices = {
    insertToDB,
    getAllUsersFromDB
}