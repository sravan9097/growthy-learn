
import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarItemProps {
  title: string;
  isActive: boolean;
  isCompleted?: boolean;
  onClick: () => void;
  content?: string;
}

const SidebarItem = ({ title, isActive, isCompleted, onClick, content }: SidebarItemProps) => {
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

  return (
    <Collapsible open={isOpen} onOpenChange={handleToggle}>
      <CollapsibleTrigger asChild>
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
              isOpen && "rotate-180"
            )} />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {content && (
          <div className="px-4 py-2 text-sm text-muted-foreground border-l-2 ml-4 mt-2 border-primary/20">
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
  onStepChange: (step: string) => void;
  content: Record<string, string>;
}

export function OnePagerSidebar({ 
  activeStep, 
  completedSteps, 
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

  return (
    <div className="w-full space-y-2">
      {steps.map((step) => (
        <SidebarItem
          key={step.id}
          title={step.title}
          isActive={activeStep === step.id}
          isCompleted={completedSteps.includes(step.id)}
          onClick={() => onStepChange(step.id)}
          content={content[step.id] || ""}
        />
      ))}
    </div>
  );
}
