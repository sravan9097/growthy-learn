
import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  title: string;
  isActive: boolean;
  isCompleted?: boolean;
  onClick: () => void;
}

const SidebarItem = ({ title, isActive, isCompleted, onClick }: SidebarItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-between px-4 py-3 cursor-pointer group rounded-md",
        isActive ? "bg-primary/5" : "hover:bg-accent/5"
      )}
      onClick={onClick}
    >
      <span className={cn(
        "text-base",
        isActive && "text-primary font-medium",
        isCompleted && "text-green-600"
      )}>
        {title}
      </span>
      <div className="flex items-center">
        {isCompleted && (
          <Check className="h-5 w-5 text-green-600 mr-2" />
        )}
        <ChevronDown className={cn(
          "h-5 w-5 text-muted-foreground transition-transform",
          isActive && "rotate-180"
        )} />
      </div>
    </div>
  );
};

interface OnePagerSidebarProps {
  activeStep: string;
  completedSteps: string[];
  onStepChange: (step: string) => void;
}

export function OnePagerSidebar({ 
  activeStep, 
  completedSteps, 
  onStepChange 
}: OnePagerSidebarProps) {
  const steps = [
    { id: "inputs", title: "One-Pager Inputs" },
    { id: "how-it-works", title: "How it works?" },
    { id: "use-cases", title: "Use-Cases" },
    { id: "problem-statement", title: "Problem Statement" },
    { id: "conclusion", title: "Conclusion" },
    { id: "title", title: "Title" },
  ];

  return (
    <div className="w-full space-y-2">
      {steps.map((step) => (
        <SidebarItem
          key={step.id}
          title={step.title}
          isActive={activeStep === step.id}
          isCompleted={completedSteps.includes(step.id)}
          onClick={() => onStepChange(step.id)}
        />
      ))}
    </div>
  );
}
