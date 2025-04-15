
import React from "react";
import { TargetIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  title: string;
  description: React.ReactNode;
  percentage?: number;
  children?: React.ReactNode;
  variant?: "success" | "warning" | "default";
}

export function GoalCard({ 
  title, 
  description, 
  percentage = 100, 
  children,
  variant = "default"
}: GoalCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-start space-x-4">
        <div className={cn(
          "rounded-full p-2",
          variant === "success" && "bg-growthy-green-100 text-growthy-green-500",
          variant === "warning" && "bg-growthy-red-100 text-growthy-red-500",
          variant === "default" && "bg-growthy-green-100 text-growthy-green-500"
        )}>
          <TargetIcon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <div className="text-sm text-growthy-neutral-500 mb-4">
            {typeof description === "string" ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function GoalAlert({ message, weeklyTarget = 3 }: { message: string; weeklyTarget?: number }) {
  return (
    <div className="flex items-center gap-2 mt-2 bg-growthy-neutral-100 p-3 rounded-md text-sm">
      <AlertCircle className="h-5 w-5 text-growthy-red-500" />
      <span>{message}</span>
      <div className="ml-auto flex space-x-1">
        {Array(weeklyTarget).fill(0).map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-full bg-growthy-neutral-200"></div>
        ))}
      </div>
    </div>
  );
}
