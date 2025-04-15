
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eye, Brain, AlertCircle, MessageSquare, Code } from "lucide-react";

interface ReflectionThemeProps {
  type: "observation" | "curiosity" | "mistake" | "feedback" | "tech-concept";
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

export function ReflectionThemeCard({ 
  type, 
  title, 
  description, 
  selected = false, 
  onClick 
}: ReflectionThemeProps) {
  const icons = {
    "observation": Eye,
    "curiosity": Brain,
    "mistake": AlertCircle,
    "feedback": MessageSquare,
    "tech-concept": Code
  };

  const Icon = icons[type];

  return (
    <Card 
      className={cn(
        " transition-all border",
        selected ? "border-primary" : ""
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className={cn(
          "rounded-full p-2 mb-2",
          selected ? "bg-primary text-white" : "bg-growthy-neutral-100 text-growthy-neutral-500"
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-xs text-growthy-neutral-500">{description}</p>
      </CardContent>
    </Card>
  );
}

export function ReflectionThemeSelector({ 
  selectedTheme, 
  onSelectTheme 
}: { 
  selectedTheme: string | null;
  onSelectTheme: (theme: string) => void;
}) {
  const themes = [
    {
      type: "observation" as const,
      title: "Observation",
      description: "Something you noticed that's worth sharing",
    },
    {
      type: "curiosity" as const,
      title: "Curiosity",
      description: "A question or something you want to explore further",
    },
    {
      type: "mistake" as const,
      title: "Mistake",
      description: "An error you made and what you learned from it",
    },
    {
      type: "feedback" as const,
      title: "Feedback",
      description: "Insights you received from others",
    },
    {
      type: "tech-concept" as const,
      title: "Tech Concept",
      description: "A technical idea or concept you learned",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {themes.map((theme) => (
        <ReflectionThemeCard
          key={theme.type}
          type={theme.type}
          title={theme.title}
          description={theme.description}
          selected={selectedTheme === theme.type}
          //onClick={() => onSelectTheme(theme.type)}
        />
      ))}
    </div>
  );
}
