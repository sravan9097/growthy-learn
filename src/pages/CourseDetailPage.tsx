
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Book, CheckCircle, Circle, Clock, Lock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";


export default function CourseDetailPage() {
  const { id } = useParams();
  
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
        status: "completed",
        duration: "45 mins",
        lessons: [
          { title: "What is AI?", status: "completed", duration: "15 mins" },
          { title: "History of AI", status: "completed", duration: "15 mins" },
          { title: "AI Applications", status: "completed", duration: "15 mins" }
        ]
      },
      {
        id: "m2",
        title: "Machine Learning Basics",
        status: "in-progress",
        duration: "60 mins",
        lessons: [
          { title: "Supervised Learning", status: "completed", duration: "20 mins" },
          { title: "Unsupervised Learning", status: "in-progress", duration: "20 mins" },
          { title: "Reinforcement Learning", status: "locked", duration: "20 mins" }
        ]
      },
      {
        id: "m3",
        title: "Neural Networks",
        status: "locked",
        duration: "90 mins",
        lessons: [
          { title: "Neurons and Layers", status: "locked", duration: "30 mins" },
          { title: "Activation Functions", status: "locked", duration: "30 mins" },
          { title: "Training Neural Networks", status: "locked", duration: "30 mins" }
        ]
      },
      {
        id: "m4",
        title: "AI Ethics",
        status: "locked",
        duration: "60 mins",
        lessons: [
          { title: "Bias in AI", status: "locked", duration: "20 mins" },
          { title: "Privacy Concerns", status: "locked", duration: "20 mins" },
          { title: "Responsible AI Development", status: "locked", duration: "20 mins" }
        ]
      }
    ]
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-growthy-green-500" />;
      case "in-progress":
        return <Circle className="h-5 w-5 text-primary fill-primary/30" />;
      case "locked":
      default:
        return <Lock className="h-5 w-5 text-growthy-neutral-400" />;
    }
  };

  return (
    <Layout>
      <div>
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
                <Button>Continue Learning</Button>
                <Button variant="outline">View Resources</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
          
          <div className="space-y-6">
            {course.modules.map((module, index) => (
              <div key={module.id} className={`border rounded-lg ${module.status === 'locked' ? 'opacity-70' : ''}`}>
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {renderStatusIcon(module.status)}
                    <h3 className="font-medium">
                      {index + 1}. {module.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-growthy-neutral-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration}
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        {renderStatusIcon(lesson.status)}
                        <span className={`${lesson.status === 'locked' ? 'text-growthy-neutral-400' : ''}`}>
                          {lesson.title}
                        </span>
                      </div>
                      <div className="text-sm text-growthy-neutral-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {lesson.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
