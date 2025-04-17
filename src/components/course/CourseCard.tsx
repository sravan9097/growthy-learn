
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ArrowRight, CheckCircle, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: number;
  title: string;
  status?: "not-started" | "in-progress" | "completed";
  progress?: number;
  onClick?: () => void;
  extraInfo?: React.ReactNode;
  mentorReview?: {
    status: "pending" | "completed";
    level?: "basic" | "satisfactory" | "thorough";
    date?: string;
  };
}

export function CourseCard({ 
  id, 
  title, 
  status = "not-started", 
  progress = 0, 
  onClick,
  extraInfo,
  mentorReview
}: CourseCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // Navigate to course detail page
    navigate(`/course/${id}`);
  };

  const getStatusColor = () => {
    if (status === "completed") return "bg-green-500";
    if (status === "in-progress") return "bg-blue-500";
    return "bg-gray-300";
  };

  return (
    <Card 
      className={cn(
        "hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden",
        status === "completed" && "border-l-4 border-l-green-500"
      )}
      onClick={handleClick}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Book className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          
          {status === "in-progress" && (
            <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
              In Progress
            </Badge>
          )}
          {status === "completed" && (
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-600 hover:bg-green-100">
              <CheckCircle className="h-3 w-3" />
              Completed
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pt-2 pb-0">
        {progress > 0 && (
          <div className="mb-3">
            <div className="flex justify-between mb-1 text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="flex h-full">
                <div 
                  className={cn("h-full bg-green-500", 
                    progress < 100 && "rounded-r-full"
                  )} 
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}
        
        {extraInfo && (
          <div className="mb-3">
            {extraInfo}
          </div>
        )}
        
        {mentorReview && (
          <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs">
            <div className="font-medium mb-1">Mentor Evaluation</div>
            {mentorReview.status === "pending" ? (
              <div className="flex items-center text-amber-500">
                <Timer className="h-3 w-3 mr-1" />
                <span>Awaiting Review</span>
              </div>
            ) : (
              <div>
                <span className="font-medium">Understanding: </span>
                <span className={cn(
                  mentorReview.level === "thorough" && "text-green-600",
                  mentorReview.level === "satisfactory" && "text-blue-600",
                  mentorReview.level === "basic" && "text-amber-600"
                )}>
                  {mentorReview.level === "thorough" && "Thorough"}
                  {mentorReview.level === "satisfactory" && "Satisfactory"}
                  {mentorReview.level === "basic" && "Basic"}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
     
      <CardFooter className="pb-3 pt-2">
        <Button variant="ghost" className="text-primary p-0" size="sm">
          <span>{status === "not-started" ? "Start Course" : "Continue"}</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
