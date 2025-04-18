
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronDown, ChevronRight, Edit, Edit2, Edit3, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepItemProps {
  id: string;
  title: string;
  preview: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const StepItem = ({
  id,
  title,
  preview,
  isActive,
  isCompleted,
  onClick,
  isExpanded,
  onToggleExpand
}: StepItemProps) => {
  return (
    <div className={cn(
      "border-l-2 pl-4 py-3 cursor-pointer group relative",
      isCompleted ? "border-green-500" : isActive ? "border-primary" : "border-gray-200"
    )}>
      <div className={cn(
        "absolute -left-[9px] top-3 w-4 h-4 rounded-full border-2 bg-white",
        isCompleted ? "border-green-500 bg-green-500" : isActive ? "border-primary" : "border-gray-300"
      )}>
        {isCompleted && <Check className="h-3 w-3 text-white absolute -left-[1px] -top-[1px]" />}
      </div>
      
      <div 
        className="flex items-center justify-between"
        onClick={onToggleExpand}
      >
        <h3 className={cn(
          "text-sm",
          isActive ? "font-medium" : "font-normal text-muted-foreground"
        )}>
          {title}
        </h3>
        <button className="text-muted-foreground hover:text-primary">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
      
      {isExpanded && (
        <div 
          className={cn(
            "mt-2 text-xs text-muted-foreground bg-gray-50 rounded p-2",
            isActive && "bg-primary/5"
          )}
          onClick={onClick}
        >
          {preview || "No content yet"}
          <div className="mt-2 text-xs font-medium text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Edit3 className="h-3 w-3 mr-1" /> 
            Edit this section
          </div>
        </div>
      )}
    </div>
  );
};

interface OnePagerSidebarProps {
  activeStepId: string;
  completedSteps: string[];
  inProgressStep: string;
  onStepChange: (step: string) => void;
  content: Record<string, string>;
}

export function OnePagerSidebar({
  activeStepId,
  completedSteps,
  inProgressStep,
  onStepChange,
  content
}: OnePagerSidebarProps) {
  const [expandedSteps, setExpandedSteps] = React.useState<Record<string, boolean>>({});

  // Define the steps structure
  const steps = [
    { id: "inputs", title: "One-Pager Inputs" },
    { id: "how-it-works", title: "How it Works?" },
    { id: "use-cases", title: "Use-Cases" },
    { id: "problem-statement", title: "Problem Statement" },
    { id: "conclusion", title: "Conclusion" },
    { id: "title", title: "Title" }
  ].map(step => ({
    ...step,
    content: content[step.id] || ""
  }));

  const toggleStepExpand = (stepId: string) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  // Ensure active step is expanded
  React.useEffect(() => {
    setExpandedSteps(prev => ({
      ...prev,
      [activeStepId]: true
    }));
  }, [activeStepId]);

  return (
    <div className="h-full ">
      <div className="p-4 border-b">
        <h2 className="font-medium">Creation of One-Pager</h2>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
          <div className="h-2 bg-primary/40 rounded-full w-16"></div>
          <span>{completedSteps.length} of {steps.length} sections completed</span>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-130px)]">
        <div className="p-4 space-y-1">
          {steps.map((step) => (
            <StepItem
              key={step.id}
              id={step.id}
              title={step.title}
              preview={step.content.substring(0, 100) + (step.content.length > 100 ? "..." : "")}
              isActive={activeStepId === step.id}
              isCompleted={completedSteps.includes(step.id)}
              onClick={() => onStepChange(step.id)}
              isExpanded={expandedSteps[step.id] || false}
              onToggleExpand={() => toggleStepExpand(step.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
