import { getDashboardCourses } from "@/actions/GetDashboardCourse";
import CoursesList from "@/components/CoursesList";
import { auth } from "@clerk/nextjs";
import { CheckCircleIcon, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import InfoCard from "./_components/InfoCard";

const Dashboard = async () => {

  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-x-4">
      <div className="max-w-7xl grid grid-cols-1 gap-y-3 sm:grid-cols-2 gap-x-4 mb-5">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircleIcon}
          label="Completed Course"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList item={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
};

export default Dashboard;
