
import React from "react";
import { Check, ChevronDown, Edit, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  title: string;
  isActive: boolean;
  isCompleted?: boolean;
  isInProgress?: boolean;
  onClick: () => void;
  content?: string;
}

const SidebarItem = ({ title, isActive, isCompleted, isInProgress, onClick, content }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = React.useState(isActive);

  // Toggle the open state
  const handleToggle = (open: boolean) => {
    setIsOpen(open);
  };

  // When a different step becomes active, open that step
  React.useEffect(() => {
    if (isActive) {
      setIsOpen(true);
    }
  }, [isActive]);

  // Get the status icon based on the state
  const getStatusIcon = () => {
    if (isCompleted) return <Check className="h-5 w-5 text-green-600" />;
    if (isInProgress) return <Edit className="h-5 w-5 text-blue-500" />;
    return <CircleDashed className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <Collapsible open={isOpen} onOpenChange={handleToggle}>
      <CollapsibleTrigger asChild>
        <div 
          className={cn(
            "flex items-center justify-between px-4 py-3 cursor-pointer group rounded-md transition-all mb-1",
            isActive ? "bg-primary/10" : "hover:bg-accent/5",
            isCompleted && "border-l-2 border-green-600 pl-3"
          )}
          onClick={onClick}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {getStatusIcon()}
            </div>
            <span className={cn(
              "text-base",
              isActive && "text-primary font-medium",
              isCompleted && "text-green-600"
            )}>
              {title}
            </span>
          </div>
          <ChevronDown className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {content && (
          <div className="px-4 py-2 text-sm text-muted-foreground border-l-2 ml-4 mt-1 mb-2 border-primary/20">
            {content.length > 100 
              ? content.substring(0, 100) + "..." 
              : content}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

interface OnePagerSidebarProps {
  activeStep: string;
  completedSteps: string[];
  inProgressStep?: string;
  onStepChange: (step: string) => void;
  content: Record<string, string>;
}

export function OnePagerSidebar({ 
  activeStep, 
  completedSteps, 
  inProgressStep,
  onStepChange,
  content 
}: OnePagerSidebarProps) {
  const steps = [
    { id: "inputs", title: "One-Pager Inputs" },
    { id: "how-it-works", title: "How it works?" },
    { id: "use-cases", title: "Use-Cases" },
    { id: "problem-statement", title: "Problem Statement" },
    { id: "conclusion", title: "Conclusion" },
    { id: "title", title: "Title" },
  ];

  // Calculate overall progress
  const progress = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="px-4 py-2 mb-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{completedSteps.length} of {steps.length} completed</span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {steps.map((step) => (
        <SidebarItem
          key={step.id}
          title={step.title}
          isActive={activeStep === step.id}
          isCompleted={completedSteps.includes(step.id)}
          isInProgress={inProgressStep === step.id && !completedSteps.includes(step.id)}
          onClick={() => onStepChange(step.id)}
          content={content[step.id] || ""}
        />
      ))}
    </div>
  );
}
