import { Course, CourseFacalty } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { ICourseCreateData } from './course.constant';

const insertIntoDB = async (data: any) => {
  const { preRequisiteCourses, ...courseData } = data;
  //   console.log("data:", data)

  const newCourses = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: courseData,
      include: {
        preRequisites: true,
        preRequisitesFor: true,
      },
    });

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // for (let index = 0; index < preRequisiteCourses.length; index++) {
      //   const preRequisiteCourse =
      //     await transactionClient.courseToPreRequisites.create({
      //       data: {
      //         courseId: result.id,
      //         preRequisiteId: preRequisiteCourses[index].courseId,
      //       },
      //       include: {
      //         preRequisite: true,
      //       },
      //     });
      //   console.log({ preRequisiteCourse });
      // }

      await asyncForEach(preRequisiteCourses, async (preRequisite: any) => {
        const createPreRequisite =
          await transactionClient.courseToPreRequisites.create({
            data: {
              courseId: result.id,
              preRequisiteId: preRequisite.courseId,
            },
            include: {
              preRequisite: true,
            },
          });
      });
    }

    return result;
  });

  if (newCourses) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourses.id,
      },
      include: {
        preRequisites: {
          include: {
            preRequisite: true,
          },
        },

        preRequisitesFor: {
          include: {
            course: true,
          },
        },
      },
    });

    return responseData;
  }

  return newCourses;
};

export const getAllCourse = async (): Promise<Course[]> => {
  const result = await prisma.course.findMany({
    include: {
      preRequisites: {
        include: {
          preRequisite: true,
        },
      },
      preRequisitesFor: {
        include: {
          course: true,
        },
      },
    },
  });

  return result;
};

export const getCourseById = async (id: string) => {
  const result = await prisma.course.findUnique({
    where: { id: id },
    include: {
      preRequisites: {
        include: {
          preRequisite: true,
        },
      },
      preRequisitesFor: {
        include: {
          course: true,
        },
      },
      facalties: true
    },
  });

  return result;
};

const deleteCourseByid = async (id: string) => {
  const result = await prisma.course.delete({
    where: {
      id: id,
    },
  });

  return result;
};

const updateOneInDB = async (id: string, payload: ICourseCreateData) => {
  const { preRequisiteCourses, ...courseData } = payload;

  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id: id,
      },
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Filed to update course!!');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && coursePrerequisite.isDeleted
      );

      const newPrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && !coursePrerequisite.isDeleted
      );

      //  Delete Working for it
      //  for(let index = 0; index < deletePreRequisite.length; index++ ){
      //     await transactionClient.courseToPreRequisites.deleteMany({
      //       where: {
      //         AND: [
      //            {
      //             courseId: id
      //            },
      //            {
      //             preRequisiteId: deletePreRequisite[index].courseId
      //            }
      //         ]
      //       }
      //     })
      //  }

      await asyncForEach(
        deletePreRequisite,
        async (deletePreRequisite: any) => {
          await transactionClient.courseToPreRequisites.deleteMany({
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  preRequisiteId: deletePreRequisite.courseId,
                },
              ],
            },
          });
        }
      );

      //  insert data for it
      // for(let index =0; index < newPrerequisite.length; index++){
      //   await transactionClient.courseToPreRequisites.create({
      //     data: {
      //       courseId: id,
      //       preRequisiteId: newPrerequisite[index].courseId
      //     }
      //   })
      // }

      await asyncForEach(newPrerequisite, async (newPrerequisite: any) => {
        await transactionClient.courseToPreRequisites.create({
          data: {
            courseId: id,
            preRequisiteId: newPrerequisite.courseId,
          },
        });
      });
    }

    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisites: {
        include: {
          preRequisite: true,
        },
      },

      preRequisitesFor: {
        include: {
          course: true,
        },
      },
    },
  });

  return responseData;
};




const facultyAssign = async (id: string, payload: string[] ):Promise<CourseFacalty[]> => {
     const result =await prisma.courseFacalty.createMany({
      data: payload.map((faculty) => ({
         courseId: id,
         facultyId: faculty
      }))
     });

     const facultyAssignData =await prisma.courseFacalty.findMany({
      where: {
        courseId: id
      },
      include: {
        faculty: true
      }
     });

     return facultyAssignData
}



export const courseService = {
  insertIntoDB,
  getAllCourse,
  getCourseById,
  updateOneInDB,
  deleteCourseByid,
  facultyAssign
};
