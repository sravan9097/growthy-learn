
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
interface CourseCardProps {
  id: number;
  title: string;
  status?: "not-started" | "in-progress" | "completed";
  onClick?: () => void ;
}

export function CourseCard({ id , title, status = "not-started", onClick }: CourseCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default navigation logic
      navigate(`/course/${id}`); // You can use an ID or slug instead of title if preferred
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-start items-center">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Book className="h-5 w-5" />
          </div>
          <CardContent className="p-2 w-auto ">
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardContent>
          {status === "in-progress" && (
            <Badge variant="outline" className="bg-growthy-green-100 text-growthy-green-500 hover:bg-growthy-green-200">
              In Progress
            </Badge>
          )}
          {status === "completed" && (
            <Badge variant="outline" className="bg-growthy-neutral-100 text-growthy-neutral-500 hover:bg-growthy-neutral-200">
              Completed
            </Badge>
          )}
        </div>
      </CardHeader>
     
      <CardFooter className="pb-3">
        <Button variant="ghost" className="text-primary p-0" size="sm">
          <span>{status === "not-started" ? "Start Course" : "Continue"}</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
