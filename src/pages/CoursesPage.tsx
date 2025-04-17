
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CourseCard } from "@/components/course/CourseCard";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter, 
  SortDesc, 
  ListFilter, 
  Check, 
  Clock, 
  CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function CoursesPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("alphabetical");
  
  // Course data
  const courses = [
    { id: 1, title: "AI Fundamentals", status: "in-progress" as const, progress: 25 },
    { id: 2, title: "Web Development", status: "completed" as const, progress: 100 },
    { id: 3, title: "Product Management", status: "not-started" as const, progress: 0 },
    { id: 4, title: "UX Design Principles", status: "not-started" as const, progress: 0 },
    { id: 5, title: "Data Analysis", status: "not-started" as const, progress: 0 },
    { id: 6, title: "Leadership Skills", status: "not-started" as const, progress: 0 },
  ];

  const handleCourseClick = (courseTitle: string) => {
    console.info("Clicked on course:", courseTitle);
  };

  // Filter and sort courses
  const filteredAndSortedCourses = courses
    .filter(course => {
      // Apply status filter if set
      if (statusFilter && course.status !== statusFilter) {
        return false;
      }
      
      // Apply search filter
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortOrder) {
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "progress":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

  return (
    <Layout>
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Courses</h1>
        </div>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                  {statusFilter && <Badge variant="secondary" className="ml-1">{statusFilter}</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  <ListFilter className="mr-2 h-4 w-4" />
                  All Courses
                  {!statusFilter && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
                  <Clock className="mr-2 h-4 w-4" />
                  In Progress
                  {statusFilter === "in-progress" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Completed
                  {statusFilter === "completed" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <SortDesc className="h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOrder("alphabetical")}>
                  Alphabetical
                  {sortOrder === "alphabetical" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("progress")}>
                  % Completed
                  {sortOrder === "progress" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedCourses.length > 0 ? (
            filteredAndSortedCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                status={course.status}
                onClick={() => handleCourseClick(course.title)}
                progress={course.progress}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No courses match your filters. Try adjusting your search or filters.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
