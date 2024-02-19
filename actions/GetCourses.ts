import { Category, Course } from "@prisma/client";

import React from 'react'
import { db } from "@/lib/db";
import GetProgress from "./GetProgress";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourse = {
    userId: string
    title?: string
    categoryId?: string
}


const GetCourses= async ({userId, title, categoryId}: GetCourse): Promise<CourseWithProgressWithCategory[]> => {
    try {

        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title
                },
                categoryId
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true
                    },
                    select: {
                        id: true
                    }
                },
                purchases: {
                    where: {
                        userId
                    }
                }
            },
            orderBy: {
                createAt: "desc"
            }
        })

        const courseWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async (course) => {
                if(course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null
                    }
                }

                const progressPercent = await GetProgress(userId, course.id);

                return {
                    ...course,
                    progress: progressPercent
                }
            })
        )

        return courseWithProgress

    } catch (error) {
        console.log("GET_COURSES", error)
        return []
    }
}

export default GetCourses