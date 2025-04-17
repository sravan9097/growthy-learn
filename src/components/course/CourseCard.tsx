
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ArrowRight, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
  id: number;
  title: string;
  status?: "not-started" | "in-progress" | "completed";
  progress?: number;
  onClick?: () => void;
}

export function CourseCard({ id, title, status = "not-started", progress = 0, onClick }: CourseCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // Navigate to course detail page
    navigate(`/course/${id}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Book className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          
          {status === "in-progress" && (
            <Badge variant="outline" className="bg-growthy-green-100 text-growthy-green-500 hover:bg-growthy-green-200">
              In Progress
            </Badge>
          )}
          {status === "completed" && (
            <Badge variant="outline" className="flex items-center gap-1 bg-growthy-neutral-100 text-growthy-neutral-500 hover:bg-growthy-neutral-200">
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
            <Progress value={progress} className="h-1.5" />
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
