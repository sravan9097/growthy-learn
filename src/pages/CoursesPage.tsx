
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { CourseCard } from "@/components/course/CourseCard";
import { useToast } from "@/hooks/use-toast";

export default function CoursesPage() {
  const { toast } = useToast();
  
  const courses = [
    { id: 1, title: "AI Fundamentals", status: "in-progress" as const },
    { id: 2, title: "Web Development", status: "completed" as const },
    { id: 3, title: "Product Management", status: "not-started" as const },
    { id: 4, title: "UX Design Principles", status: "not-started" as const },
    { id: 5, title: "Data Analysis", status: "not-started" as const },
    { id: 6, title: "Leadership Skills", status: "not-started" as const },
  ];

  const handleCourseClick = (courseTitle: string) => {
    console.info("Clicked on course:", courseTitle);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-6">Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              status={course.status}
              onClick={() => handleCourseClick(course.title)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
