import { Category, Course } from "@prisma/client";
import React from "react";
import CourseCard from "./CourseCard";

type CoursesWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  item: CoursesWithProgressWithCategory[];
}

const CoursesList = ({ item }: CourseListProps) => {
  return (
    <div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 cl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {item.map((it) => (
          <CourseCard
            key={it.id}
            id={it.id}
            title={it.title}
            imageUrl={it.imageUrl!}
            chapterLenght={it.chapters.length}
            price={it.price!}
            progress={it.progress}
            category={it?.category?.name!}
          />
        ))}
      </div>
      {item.length === 0 && (
        <div className="text-center text-slate-500 mt-12 text-sm text-muted-foreground">
          No Course Found.
        </div>
      )}
    </div>
  );
};

export default CoursesList;
