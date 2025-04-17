
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "@/components/course/CourseCard";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Info,
  CheckCircle2,
  CircleEllipsis,
  Timer,
  RefreshCcw,
  AlertCircle
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define types for course data
interface Course {
  id: number;
  title: string;
  status: "not-started" | "in-progress" | "completed" | "in-review";
  progress: number;
  lastActivity: string;
  modules: {
    total: number;
    completed: number;
    inProgress: number;
    inReview: number;
  };
  tags?: string[];
  mentorAssigned?: string;
}

export default function MyLearningsPage() {
  const [activeTab, setActiveTab] = useState("in-progress");
  const [expandedSection, setExpandedSection] = useState<string | null>("in-progress");

  // Mock course data
  const courses: Course[] = [
    { 
      id: 1, 
      title: "JavaScript Fundamentals", 
      status: "in-progress",
      progress: 45,
      lastActivity: "2025-04-15",
      modules: {
        total: 7,
        completed: 3,
        inProgress: 1,
        inReview: 0
      },
      tags: ["Frontend", "Programming"],
      mentorAssigned: "Alex Wong"
    },
    { 
      id: 2, 
      title: "React for Beginners", 
      status: "in-progress",
      progress: 72,
      lastActivity: "2025-04-16",
      modules: {
        total: 8,
        completed: 5,
        inProgress: 1,
        inReview: 1
      },
      tags: ["Frontend", "UI"]
    },
    { 
      id: 3, 
      title: "Introduction to TypeScript", 
      status: "completed",
      progress: 100,
      lastActivity: "2025-03-28",
      modules: {
        total: 6,
        completed: 6,
        inProgress: 0,
        inReview: 0
      },
      tags: ["Programming"]
    },
    { 
      id: 4, 
      title: "Docker Fundamentals", 
      status: "completed",
      progress: 100,
      lastActivity: "2025-02-28",
      modules: {
        total: 5,
        completed: 5,
        inProgress: 0,
        inReview: 0
      }
    },
    { 
      id: 5, 
      title: "Cloud Computing Basics", 
      status: "not-started",
      progress: 0,
      lastActivity: "",
      modules: {
        total: 8,
        completed: 0,
        inProgress: 0,
        inReview: 0
      }
    },
    { 
      id: 6, 
      title: "DevOps Principles", 
      status: "not-started",
      progress: 0,
      lastActivity: "",
      modules: {
        total: 7,
        completed: 0,
        inProgress: 0,
        inReview: 0
      }
    },
    { 
      id: 7, 
      title: "Node.js APIs", 
      status: "in-review",
      progress: 92,
      lastActivity: "2025-04-14",
      modules: {
        total: 6,
        completed: 5,
        inProgress: 0,
        inReview: 1
      },
      mentorAssigned: "Sarah Johnson"
    }
  ];

  // Filter courses by status
  const inProgressCourses = courses.filter(course => course.status === "in-progress" || course.status === "in-review");
  const completedCourses = courses.filter(course => course.status === "completed");
  const notStartedCourses = courses.filter(course => course.status === "not-started");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Get the last activity date in readable format
  const getLastActivityText = (dateString: string) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return formatDate(date);
  };

  // Get status badge
  const getStatusBadge = (status: Course['status']) => {
    switch (status) {
      case "in-progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100">Completed</Badge>;
      case "in-review":
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-100">In Review</Badge>;
      case "not-started":
        return <Badge variant="outline" className="bg-gray-50 text-gray-600 hover:bg-gray-100">Not Started</Badge>;
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl w-full self-center mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Learnings</h1>

        <div className="mb-8">
          <Tabs defaultValue="section-view" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="section-view">Section View</TabsTrigger>
              <TabsTrigger value="all-courses">All Courses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="section-view" className="space-y-6">
              {/* In Progress & In Review Section */}
              <div className="border rounded-lg overflow-hidden">
                <div 
                  className={cn(
                    "flex items-center justify-between p-4 bg-blue-50 cursor-pointer",
                    expandedSection === "in-progress" ? "border-b" : ""
                  )}
                  onClick={() => toggleSection("in-progress")}
                >
                  <div className="flex items-center gap-2 font-medium">
                    <RefreshCcw className="h-5 w-5 text-blue-500" />
                    <h2>📚 In Progress ({inProgressCourses.length})</h2>
                  </div>
                  {expandedSection === "in-progress" ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
                
                {expandedSection === "in-progress" && (
                  <div className="p-4 space-y-4">
                    {inProgressCourses.length > 0 ? (
                      inProgressCourses.map(course => (
                        <CourseCard 
                          key={course.id}
                          id={course.id}
                          title={course.title}
                          status={course.status as "in-progress" | "completed"}
                          progress={course.progress}
                          extraInfo={
                            <div className="flex flex-col text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Last updated: {getLastActivityText(course.lastActivity)}</span>
                              </div>
                              {course.tags && course.tags.length > 0 && (
                                <div className="mt-1 flex gap-1">
                                  {course.tags.map(tag => (
                                    <span key={tag} className="bg-secondary/50 px-1.5 py-0.5 rounded-sm">{tag}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          }
                        />
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No courses in progress
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Completed Section */}
              <div className="border rounded-lg overflow-hidden">
                <div 
                  className={cn(
                    "flex items-center justify-between p-4 bg-green-50 cursor-pointer",
                    expandedSection === "completed" ? "border-b" : ""
                  )}
                  onClick={() => toggleSection("completed")}
                >
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h2>✅ Completed ({completedCourses.length})</h2>
                  </div>
                  {expandedSection === "completed" ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
                
                {expandedSection === "completed" && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedCourses.length > 0 ? (
                      completedCourses.map(course => (
                        <CourseCard 
                          key={course.id}
                          id={course.id}
                          title={course.title}
                          status="completed"
                          progress={course.progress}
                        />
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8 text-muted-foreground">
                        No completed courses
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Not Started Section */}
              <div className="border rounded-lg overflow-hidden">
                <div 
                  className={cn(
                    "flex items-center justify-between p-4 bg-gray-50 cursor-pointer",
                    expandedSection === "not-started" ? "border-b" : ""
                  )}
                  onClick={() => toggleSection("not-started")}
                >
                  <div className="flex items-center gap-2 font-medium">
                    <CircleEllipsis className="h-5 w-5 text-gray-500" />
                    <h2>⏳ Not Started ({notStartedCourses.length})</h2>
                  </div>
                  {expandedSection === "not-started" ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
                
                {expandedSection === "not-started" && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {notStartedCourses.length > 0 ? (
                      notStartedCourses.map(course => (
                        <CourseCard 
                          key={course.id}
                          id={course.id}
                          title={course.title}
                          status="not-started"
                          progress={course.progress}
                        />
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8 text-muted-foreground">
                        No courses to start
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="all-courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(course => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    status={course.status === "in-review" ? "in-progress" : course.status}
                    progress={course.progress}
                    extraInfo={
                      course.status !== "not-started" ? (
                        <div className="flex flex-col text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Last updated: {getLastActivityText(course.lastActivity)}</span>
                          </div>
                          {course.status === "in-review" && (
                            <div className="mt-1 flex items-center gap-1 text-amber-500">
                              <Timer className="h-3 w-3" />
                              <span>Awaiting review</span>
                            </div>
                          )}
                        </div>
                      ) : undefined
                    }
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
