import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ModulePage() {
  const { courseId, moduleId } = useParams();
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [reflectionsSubmitted, setReflectionsSubmitted] = useState(0);

  const module = {
    id: moduleId || "1",
    title: "Module Title",
    description: "Module Description",
    phases: [
      { id: "learn", title: "Learn", description: "Learn Description" },
      { id: "reflect", title: "Reflect", description: "Reflect Description" },
      { id: "evaluate", title: "Evaluate", description: "Evaluate Description" },
    ],
  };

  const completeTask = () => {
    setTasksCompleted(tasksCompleted + 1);
  };

  const submitReflection = () => {
    setReflectionsSubmitted(1);
  };

  const isPhaseEnabled = (phase: string) => {
    if (phase === "learn") return true;
    if (phase === "reflect") return tasksCompleted > 0;
    if (phase === "evaluate") return reflectionsSubmitted;
    return false;
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-6">
        <div className="mb-6">
          <Link to={`/course/${courseId}`}>
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4">{module.title}</h1>
        <p className="text-gray-600 mb-4">{module.description}</p>

        <div className="flex space-x-4">
          {module.phases.map((phase) => (
            <div key={phase.id}>
              <Button
                variant="outline"
                disabled={!isPhaseEnabled(phase.id)}
              >
                {phase.title}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button onClick={completeTask}>Complete Task</Button>
          <Button onClick={submitReflection}>Submit Reflection</Button>
        </div>

        <div className="mt-6">
          <p>Tasks Completed: {tasksCompleted}</p>
          <p>Reflections Submitted: {reflectionsSubmitted}</p>
        </div>
      </div>
    </Layout>
  );
}
