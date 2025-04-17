
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Book, 
  CheckCircle, 
  Circle, 
  Clock, 
  Lock, 
  ChevronDown,
  ChevronUp,
  Check,
  Github
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

// Define types for better code organization
interface Lesson {
  title: string;
  status: "completed" | "in-progress" | "locked";
  duration: string;
  isHandsOn?: boolean;
  instructions?: string;
  expectedOutcome?: string;
  githubLink?: string;
}

interface Module {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "locked";
  duration: string;
  lessons: Lesson[];
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [githubLink, setGithubLink] = useState("");
  
  // Course data (in a real app, this would be fetched based on the id)
  const course = {
    id: id || "1",
    title: "AI Fundamentals",
    description: "Learn the core concepts of artificial intelligence and machine learning",
    progress: 25,
    startDate: "2025-03-15",
    modules: [
      {
        id: "m1",
        title: "Introduction to AI",
        status: "completed" as const,
        duration: "45 mins",
        lessons: [
          { title: "What is AI?", status: "completed" as const, duration: "15 mins" },
          { title: "History of AI", status: "completed" as const, duration: "15 mins" },
          { title: "AI Applications", status: "completed" as const, duration: "15 mins" }
        ]
      },
      {
        id: "m2",
        title: "Machine Learning Basics",
        status: "in-progress" as const,
        duration: "60 mins",
        lessons: [
          { title: "Supervised Learning", status: "completed" as const, duration: "20 mins" },
          { 
            title: "Unsupervised Learning", 
            status: "in-progress" as const, 
            duration: "20 mins",
            isHandsOn: true,
            instructions: "Create a clustering algorithm using the provided dataset.",
            expectedOutcome: "A visual representation of clustered data points."
          },
          { title: "Reinforcement Learning", status: "locked" as const, duration: "20 mins" }
        ]
      },
      {
        id: "m3",
        title: "Neural Networks",
        status: "locked" as const,
        duration: "90 mins",
        lessons: [
          { title: "Neurons and Layers", status: "locked" as const, duration: "30 mins" },
          { title: "Activation Functions", status: "locked" as const, duration: "30 mins" },
          { title: "Training Neural Networks", status: "locked" as const, duration: "30 mins" }
        ]
      },
      {
        id: "m4",
        title: "AI Ethics",
        status: "locked" as const,
        duration: "60 mins",
        lessons: [
          { title: "Bias in AI", status: "locked" as const, duration: "20 mins" },
          { title: "Privacy Concerns", status: "locked" as const, duration: "20 mins" },
          { title: "Responsible AI Development", status: "locked" as const, duration: "20 mins" }
        ]
      }
    ] as Module[]
  };

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  // Handle checkbox toggle for lesson completion
  const toggleLessonStatus = (moduleIndex: number, lessonIndex: number) => {
    // In a real app, this would update the status in the backend
    toast({
      title: "Status updated",
      description: "Your progress has been saved."
    });
  };

  // Handle GitHub link submission
  const handleGithubSubmit = (moduleId: string, lessonIndex: number) => {
    if (!githubLink) {
      toast({
        title: "Empty link",
        description: "Please enter a GitHub link before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate GitHub link format (basic validation)
    if (!githubLink.includes('github.com')) {
      toast({
        title: "Invalid GitHub link",
        description: "Please enter a valid GitHub repository URL.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Link submitted",
      description: "Your GitHub link has been submitted successfully."
    });
    
    // Clear the input
    setGithubLink("");
  };

  // Calculate module completion
  const getModuleCompletionText = (module: Module) => {
    const completedLessons = module.lessons.filter(l => l.status === "completed").length;
    return `${completedLessons} of ${module.lessons.length} tasks completed`;
  };

  return (
    <Layout>
      <div className="max-w-5xl w-full self-center">
        <div className="mb-6">
          <Link to="/courses">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Book className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-growthy-neutral-500 mb-4">{course.description}</p>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <div className="flex gap-3">
                <Button>{course.progress > 0 ? "Continue Learning" : "Start Course"}</Button>
                <Button variant="outline">View Resources</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
          
          <div className="space-y-4">
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id} className={`border rounded-lg ${module.status === 'locked' ? 'opacity-70' : ''}`}>
                <div 
                  className={`p-4 border-b flex justify-between items-center cursor-pointer ${expandedModules.includes(module.id) ? 'border-b' : ''}`}
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center gap-3">
                    {module.status === "completed" && <CheckCircle className="h-5 w-5 text-growthy-green-500" />}
                    {module.status === "in-progress" && <Circle className="h-5 w-5 text-primary fill-primary/30" />}
                    {module.status === "locked" && <Lock className="h-5 w-5 text-growthy-neutral-400" />}
                    
                    <h3 className="font-medium">
                      {moduleIndex + 1}. {module.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-growthy-neutral-500">
                      {getModuleCompletionText(module)}
                    </span>
                    <div className="flex items-center text-sm text-growthy-neutral-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {module.duration}
                    </div>
                    {expandedModules.includes(module.id) ? (
                      <ChevronUp className="h-4 w-4 text-growthy-neutral-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-growthy-neutral-500" />
                    )}
                  </div>
                </div>
                
                {expandedModules.includes(module.id) && (
                  <div className="p-4 space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex}>
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            {module.status !== "locked" && lesson.status !== "locked" && (
                              <Checkbox 
                                checked={lesson.status === "completed"}
                                onCheckedChange={() => toggleLessonStatus(moduleIndex, lessonIndex)}
                                disabled={lesson.status === "locked"}
                              />
                            )}
                            {(module.status === "locked" || lesson.status === "locked") && (
                              <Lock className="h-4 w-4 text-growthy-neutral-400" />
                            )}
                            <span className={`${lesson.status === 'locked' ? 'text-growthy-neutral-400' : ''} ${lesson.isHandsOn ? 'font-medium' : ''}`}>
                              {lesson.title} {lesson.isHandsOn && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded ml-2">Hands-On</span>}
                            </span>
                          </div>
                          <div className="text-sm text-growthy-neutral-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {lesson.duration}
                          </div>
                        </div>
                        
                        {/* Hands-on activities block */}
                        {lesson.isHandsOn && lesson.status !== "locked" && (
                          <div className="ml-8 mt-2 mb-4 p-3 bg-secondary/40 rounded-md space-y-3">
                            {lesson.instructions && (
                              <div>
                                <h4 className="text-sm font-medium mb-1">Instructions</h4>
                                <p className="text-sm text-growthy-neutral-600">{lesson.instructions}</p>
                              </div>
                            )}
                            
                            {lesson.expectedOutcome && (
                              <div>
                                <h4 className="text-sm font-medium mb-1">Expected Outcome</h4>
                                <p className="text-sm text-growthy-neutral-600">{lesson.expectedOutcome}</p>
                              </div>
                            )}
                            
                            <div>
                              <h4 className="text-sm font-medium mb-1">Submit Your Work</h4>
                              <div className="flex gap-2">
                                <div className="flex-1 relative">
                                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="GitHub repository link"
                                    className="pl-10 text-sm"
                                    value={githubLink}
                                    onChange={(e) => setGithubLink(e.target.value)}
                                  />
                                </div>
                                <Button size="sm" onClick={() => handleGithubSubmit(module.id, lessonIndex)}>
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
