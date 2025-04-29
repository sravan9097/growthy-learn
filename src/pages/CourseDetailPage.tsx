import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  status: "locked" | "unlocked" | "in-progress" | "completed";
}

export default function CourseDetailPage() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  useEffect(() => {
    // Mock course data
    const mockCourse: Course = {
      id: "1",
      title: "Mastering TypeScript",
      description: "A comprehensive guide to learning TypeScript from scratch.",
      imageUrl: "/typescript.png",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      modules: [
        {
          id: "1",
          title: "Introduction to TypeScript",
          description: "Learn the basics of TypeScript and its benefits.",
          content: "Welcome to the first module...",
          status: "completed",
        },
        {
          id: "2",
          title: "Type Annotations and Inference",
          description: "Understand how to use type annotations and inference in TypeScript.",
          content: "In this module, we'll cover...",
          status: "in-progress",
        },
        {
          id: "3",
          title: "Interfaces and Classes",
          description: "Explore interfaces and classes in TypeScript.",
          content: "This module dives into...",
          status: "unlocked",
        },
        {
          id: "4",
          title: "Advanced Types",
          description: "Learn about advanced types in TypeScript.",
          content: "In this module, we'll cover...",
          status: "locked",
        },
        {
          id: "5",
          title: "Generics",
          description: "Understand how to use generics in TypeScript.",
          content: "This module dives into...",
          status: "locked",
        },
        {
          id: "6",
          title: "Modules",
          description: "Learn about modules in TypeScript.",
          content: "In this module, we'll cover...",
          status: "locked",
        },
        {
          id: "7",
          title: "Decorators",
          description: "Explore decorators in TypeScript.",
          content: "This module dives into...",
          status: "locked",
        },
        {
          id: "8",
          title: "JSX with TypeScript",
          description: "Learn how to use JSX with TypeScript.",
          content: "In this module, we'll cover...",
          status: "locked",
        },
        {
          id: "9",
          title: "React with TypeScript",
          description: "Understand how to use React with TypeScript.",
          content: "This module dives into...",
          status: "locked",
        },
        {
          id: "10",
          title: "Vue with TypeScript",
          description: "Learn about Vue with TypeScript.",
          content: "In this module, we'll cover...",
          status: "locked",
        },
        {
          id: "11",
          title: "Angular with TypeScript",
          description: "Explore Angular with TypeScript.",
          content: "This module dives into...",
          status: "locked",
        },
        {
          id: "12",
          title: "Node with TypeScript",
          description: "Learn how to use Node with TypeScript.",
          content: "In this module, we'll cover...",
          status: "locked",
        },
      ],
    };

    setCourse(mockCourse);
    setActiveModule(mockCourse.modules[0].id);
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="max-w-5xl w-full self-center mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/courses")}>
            <Calendar className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="rounded-md mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>

            <Separator className="my-4" />

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Course Modules</h2>
              <Accordion type="single" collapsible>
                <ScrollArea className="h-[450px] rounded-md border p-2">
                  {course.modules.map((module) => (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger className="flex justify-between items-center py-2">
                        {module.title}
                        {module.status === "completed" && (
                          <Badge variant="secondary">Completed</Badge>
                        )}
                        {module.status === "in-progress" && (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          {module.description}
                        </p>
                        {module.status !== "locked" && (
                          <Button
                            variant="ghost"
                            onClick={() => navigate(`/module/${courseId}/${module.id}`)}
                            className="ml-auto"
                            disabled={module.status !== "completed" && module.status !== "in-progress"}
                          >
                            {module.status === "completed" ? "Review" : "Continue"}
                          </Button>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </ScrollArea>
              </Accordion>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Module Content</h2>
              {course.modules.find((m) => m.id === activeModule)?.content ||
                "Select a module to view its content."}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
