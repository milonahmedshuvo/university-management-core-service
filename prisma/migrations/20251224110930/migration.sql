-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseToPreRequisites" (
    "courseId" TEXT NOT NULL,
    "preRequisiteId" TEXT NOT NULL,

    CONSTRAINT "CourseToPreRequisites_pkey" PRIMARY KEY ("courseId","preRequisiteId")
);

-- AddForeignKey
ALTER TABLE "CourseToPreRequisites" ADD CONSTRAINT "CourseToPreRequisites_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseToPreRequisites" ADD CONSTRAINT "CourseToPreRequisites_preRequisiteId_fkey" FOREIGN KEY ("preRequisiteId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
