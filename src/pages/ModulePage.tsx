
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Lock, 
  Upload, 
  ExternalLink,
  Check,
  FileText,
  Info
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleTrigger, 
  CollapsibleContent 
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, getStatusColor } from "@/lib/utils";

// Define module data types
interface Task {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  resources?: {
    title: string;
    link: string;
  }[];
  requiresUpload?: boolean;
}

interface Phase {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  tasks: Task[];
}

export default function ModulePage() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<"learn" | "reflect" | "evaluate">("learn");
  const [collapsedTasks, setCollapsedTasks] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<Record<string, boolean>>({});
  
  // Dummy data for the module
  const module = {
    id: moduleId || "m1",
    courseId: courseId || "1",
    title: "Machine Learning Basics",
    description: "Learn the fundamental concepts of machine learning and how to apply them.",
    phases: [
      {
        id: "learn",
        title: "Learn",
        description: "Complete the following tasks to learn the core concepts",
        status: "in-progress" as const,
        tasks: [
          {
            id: "t1",
            title: "Read the Introduction to Machine Learning",
            description: "This article provides an overview of machine learning concepts and applications.",
            status: "completed" as const,
            resources: [
              {
                title: "Introduction to Machine Learning",
                link: "https://example.com/intro-ml"
              }
            ]
          },
          {
            id: "t2",
            title: "Watch the Supervised Learning Tutorial",
            description: "This video explains how supervised learning algorithms work with examples.",
            status: "in-progress" as const,
            resources: [
              {
                title: "Supervised Learning Tutorial",
                link: "https://example.com/supervised-learning"
              }
            ],
            requiresUpload: true
          },
          {
            id: "t3",
            title: "Complete the Classification Exercise",
            description: "Practice building a simple classification model using the provided dataset.",
            status: "locked" as const,
            resources: [
              {
                title: "Classification Exercise",
                link: "https://example.com/classification-exercise"
              }
            ],
            requiresUpload: true
          }
        ]
      },
      {
        id: "reflect",
        title: "Reflect",
        description: "Reflect on what you've learned and annotate your notes",
        status: "locked" as const,
        tasks: [
          {
            id: "r1",
            title: "Annotate Your Notes",
            description: "Upload your notes and add annotations to highlight key concepts.",
            status: "locked" as const
          },
          {
            id: "r2",
            title: "Write a Summary",
            description: "Summarize the main points you've learned about machine learning.",
            status: "locked" as const
          }
        ]
      },
      {
        id: "evaluate",
        title: "Evaluate",
        description: "Evaluate your understanding with AI feedback",
        status: "locked" as const,
        tasks: [
          {
            id: "e1",
            title: "AI Evaluation",
            description: "Review AI feedback on your annotations and summary.",
            status: "locked" as const
          },
          {
            id: "e2",
            title: "Self-Assessment",
            description: "Rate your understanding of the concepts covered in this module.",
            status: "locked" as const
          }
        ]
      }
    ] as Phase[]
  };

  // Get the current phase data
  const currentPhaseData = module.phases.find(phase => phase.id === currentPhase) || module.phases[0];
  
  // Toggle task collapse state
  const toggleTaskCollapse = (taskId: string) => {
    if (collapsedTasks.includes(taskId)) {
      setCollapsedTasks(collapsedTasks.filter(id => id !== taskId));
    } else {
      setCollapsedTasks([...collapsedTasks, taskId]);
    }
  };

  // Mark task as complete
  const markTaskComplete = (taskId: string) => {
    const task = currentPhaseData.tasks.find(t => t.id === taskId);
    
    if (task?.requiresUpload && !uploadedImages[taskId]) {
      toast({
        title: "Upload Required",
        description: "Please upload your notes before completing this task.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, update the task status
    toast({
      title: "Task Complete!",
      description: "Your progress has been saved."
    });
    
    // Auto-collapse the task
    if (!collapsedTasks.includes(taskId)) {
      toggleTaskCollapse(taskId);
    }
  };

  // Handle image upload (simulated)
  const handleImageUpload = (taskId: string) => {
    // In a real app, this would handle the actual upload
    setUploadedImages({
      ...uploadedImages,
      [taskId]: true
    });
    
    toast({
      title: "Notes Uploaded",
      description: "Your notes have been uploaded successfully."
    });
  };

  // Calculate progress percentage for the progress bar
  const calculateProgressPercentage = () => {
    // Get current phase index
    const phaseIndex = module.phases.findIndex(phase => phase.id === currentPhase);
    
    // Calculate base progress - each phase is worth a third of the total
    let progress = (phaseIndex / 3) * 100;
    
    // Add progress within the current phase
    const totalTasks = currentPhaseData.tasks.length;
    const completedTasks = currentPhaseData.tasks.filter(t => t.status === "completed").length;
    
    if (totalTasks > 0) {
      progress += ((completedTasks / totalTasks) * (1/3)) * 100;
    }
    
    return Math.round(progress);
  };

  // Get color for the phase status
  const getPhaseColor = (phaseId: string) => {
    // Find the phase
    const phase = module.phases.find(p => p.id === phaseId);
    
    if (!phase) return "text-gray-400";
    
    if (phase.id === currentPhase) return "text-primary font-medium";
    
    switch (phase.status) {
      case "completed":
        return "text-green-600";
      case "in-progress":
        return "text-blue-600";
      case "locked":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl w-full self-center">
        {/* Breadcrumb navigation */}
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={`/course/${courseId}`}>
                <ArrowLeft className="h-4 w-4 mr-1 inline" />
                Back to Course
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{module.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        
        {/* Phase progress bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-0 z-10">
          <h1 className="text-2xl font-bold mb-4">{module.title}</h1>
          
          {/* Learning phases progress */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <TooltipProvider>
                {module.phases.map((phase, index) => (
                  <Tooltip key={phase.id}>
                    <TooltipTrigger asChild>
                      <div className={cn(
                        "flex items-center gap-1",
                        getPhaseColor(phase.id)
                      )}>
                        {phase.id === currentPhase && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                        <span className="text-sm font-medium">{phase.title}</span>
                        {phase.status === "completed" && (
                          <CheckCircle className="h-4 w-4 text-green-600 ml-1" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {phase.id === currentPhase 
                        ? "You are here" 
                        : phase.status === "completed" 
                          ? "Completed" 
                          : phase.status === "locked" 
                            ? "Complete previous phases first" 
                            : "In progress"}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <Progress value={calculateProgressPercentage()} className="h-2" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">{currentPhaseData.title} Phase</h2>
            <div className="text-sm text-growthy-neutral-500">
              {currentPhaseData.description}
            </div>
          </div>
          
          {/* Vertical task progress */}
          <div className="flex gap-6">
            <div className="w-1/5">
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-3">Progress</h3>
                <div className="space-y-4">
                  {currentPhaseData.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-2">
                      {task.status === "completed" && (
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      )}
                      {task.status === "in-progress" && (
                        <Clock className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      )}
                      {task.status === "locked" && (
                        <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={cn(
                        "text-xs font-medium truncate",
                        task.status === "completed" ? "text-green-600" :
                        task.status === "in-progress" ? "text-blue-600" : 
                        "text-gray-400"
                      )}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Task cards */}
            <div className="w-4/5 space-y-4">
              {currentPhaseData.tasks.map((task) => (
                <Collapsible 
                  key={task.id} 
                  open={!collapsedTasks.includes(task.id)}
                  disabled={task.status === "locked"}
                  className={cn(
                    "border rounded-lg overflow-hidden",
                    task.status === "completed" ? "bg-green-50/50 border-green-100" : 
                    task.status === "locked" ? "opacity-60" : ""
                  )}
                >
                  <CollapsibleTrigger className="w-full" onClick={() => toggleTaskCollapse(task.id)}>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        {task.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : task.status === "in-progress" ? (
                          <Clock className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="font-medium">{task.title}</span>
                      </div>
                      <div>
                        {collapsedTasks.includes(task.id) ? (
                          <ChevronDown className="h-4 w-4 text-growthy-neutral-500" />
                        ) : (
                          <ChevronUp className="h-4 w-4 text-growthy-neutral-500" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-growthy-neutral-600 mb-4">
                        {task.description}
                      </p>
                      
                      {/* Resources */}
                      {task.resources && task.resources.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Resources</h4>
                          <div className="space-y-2">
                            {task.resources.map((resource, idx) => (
                              <a 
                                key={idx}
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-primary hover:underline"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Notes upload area */}
                      {task.requiresUpload && task.status !== "locked" && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Upload Notes</h4>
                          {uploadedImages[task.id] ? (
                            <div className="p-4 bg-gray-100 rounded-md flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-gray-500 mr-2" />
                                <span className="text-sm">notes-uploaded.jpg</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setUploadedImages({...uploadedImages, [task.id]: false})}
                              >
                                Replace
                              </Button>
                            </div>
                          ) : (
                            <div 
                              className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => handleImageUpload(task.id)}
                            >
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <p className="text-sm text-center text-gray-500">
                                Drag and drop your notes here, or click to upload
                              </p>
                              <p className="text-xs text-center text-gray-400 mt-1">
                                (PNG, JPG, PDF up to 10MB)
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Action buttons */}
                      <div className="flex justify-end gap-2 mt-2">
                        {task.status !== "locked" && (
                          <Button 
                            variant={task.status === "completed" ? "outline" : "default"}
                            onClick={() => markTaskComplete(task.id)}
                            disabled={task.status === "locked"}
                          >
                            {task.status === "completed" ? (
                              <>
                                <Check className="mr-1 h-4 w-4" />
                                Completed
                              </>
                            ) : (
                              "Mark as Done"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
          
          {/* Navigation between phases */}
          <div className="mt-8 pt-4 border-t flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/course/${courseId}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>
            
            {currentPhase === "learn" && (
              <Button 
                onClick={() => setCurrentPhase("reflect")}
                disabled={currentPhaseData.tasks.some(t => t.status !== "completed")}
              >
                Next: Reflect
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            
            {currentPhase === "reflect" && (
              <Button 
                onClick={() => setCurrentPhase("evaluate")}
                disabled={currentPhaseData.tasks.some(t => t.status !== "completed")}
              >
                Next: Evaluate
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            
            {currentPhase === "evaluate" && (
              <Button 
                onClick={() => navigate(`/course/${courseId}`)}
              >
                Complete Module
                <Check className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
