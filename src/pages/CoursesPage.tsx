
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { CourseCard } from "@/components/course/CourseCard";

export default function CoursesPage() {
  const courses = [
    { id: 1, title: "AI Fundamentals", status: "not-started" as const },
    { id: 2, title: "gRPC Fundamentals", status: "not-started" as const },
    { id: 3, title: "GraphQL & Hasura Fundamentals", status: "not-started" as const },
    { id: 4, title: "JavaScript", status: "in-progress" as const },
    { id: 5, title: "React", status: "not-started" as const },
    { id: 6, title: "Python", status: "not-started" as const },
    { id: 7, title: "Prompt Engineering", status: "not-started" as const },
  ];

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Course Learn</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              status={course.status}
              onClick={() => console.log(`Clicked on course: ${course.title}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
