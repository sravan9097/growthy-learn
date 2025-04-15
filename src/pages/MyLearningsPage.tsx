
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "@/components/course/CourseCard";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyLearningsPage() {
  const inProgressCourses = [
    { 
      id: 1, 
      title: "JavaScript", 
      progress: 45,
      modules: 6,
      completedModules: 3
    }
  ];

  const completedCourses = [
    { id: 2, title: "Introduction to TypeScript", completedDate: "Mar 15, 2024" },
    { id: 3, title: "Docker Fundamentals", completedDate: "Feb 28, 2024" }
  ];

  return (
    <Layout>
      <div className="max-w-5xl w-full self-center mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Learnings</h1>

        <Tabs defaultValue="in-progress" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="in-progress" className="space-y-6">
            {inProgressCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    {course.completedModules} of {course.modules} modules completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-growthy-neutral-500">Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-growthy-green-100 p-4 rounded-lg">
                      <h3 className="font-medium text-growthy-green-600 mb-2">Learn</h3>
                      <p className="text-sm text-growthy-neutral-500">Complete modules and hands-on activities</p>
                    </div>
                    <div className="bg-growthy-neutral-100 p-4 rounded-lg">
                      <h3 className="font-medium text-growthy-neutral-600 mb-2">Reflect</h3>
                      <p className="text-sm text-growthy-neutral-500">Annotate your notes with concept tags</p>
                    </div>
                    <div className="bg-growthy-neutral-100 p-4 rounded-lg">
                      <h3 className="font-medium text-growthy-neutral-600 mb-2">Evaluate</h3>
                      <p className="text-sm text-growthy-neutral-500">Get feedback on your learning depth</p>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            ))}

            {inProgressCourses.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">No courses in progress</h3>
                <p className="text-growthy-neutral-500 mb-4">Start learning by enrolling in a course from the Course Learn section.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="bg-growthy-green-100 h-1.5">
                    <div className="bg-growthy-green-500 h-full w-full"></div>
                  </div>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>Completed on {course.completedDate}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {completedCourses.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">No completed courses yet</h3>
                <p className="text-growthy-neutral-500">Your completed courses will appear here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
