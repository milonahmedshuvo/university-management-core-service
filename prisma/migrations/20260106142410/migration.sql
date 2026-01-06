/*
  Warnings:

  - You are about to drop the `courseFaculty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courseFaculty" DROP CONSTRAINT "courseFaculty_courseId_fkey";

-- DropForeignKey
ALTER TABLE "courseFaculty" DROP CONSTRAINT "courseFaculty_facultyId_fkey";

-- DropTable
DROP TABLE "courseFaculty";

-- CreateTable
CREATE TABLE "course-faculties" (
    "courseId" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "course-faculties_pkey" PRIMARY KEY ("courseId","facultyId")
);

-- AddForeignKey
ALTER TABLE "course-faculties" ADD CONSTRAINT "course-faculties_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course-faculties" ADD CONSTRAINT "course-faculties_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
