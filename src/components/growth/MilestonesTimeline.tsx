
import { useState } from "react";
import { ChevronDown, ChevronUp, Award, GraduationCap, FileText, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Milestone {
  type: "til" | "course" | "study" | "recognition";
  title: string;
  date: string;
  status?: "completed" | "in-progress";
  progress?: number;
}

interface MonthData {
  month: string;
  year: number;
  milestones: Milestone[];
}

export function MilestonesTimeline() {
  const [expandedMonths, setExpandedMonths] = useState<string[]>(["April 2025"]);
  
  const timelineData: MonthData[] = [
    {
      month: "April 2025",
      year: 2025,
      milestones: [
        { type: "til", title: "Wrote 10 TILs, with 2 recognized as best", date: "Apr 15, 2025" },
        { type: "course", title: "AI Fundamentals", date: "Apr 10, 2025", status: "completed" },
        { type: "study", title: "Machine Learning Basics", date: "Apr 5, 2025", status: "in-progress", progress: 60 }
      ]
    },
    // Add more months as needed
  ];

  const toggleMonth = (monthYear: string) => {
    setExpandedMonths(prev => 
      prev.includes(monthYear) 
        ? prev.filter(m => m !== monthYear)
        : [...prev, monthYear]
    );
  };

  const getMilestoneIcon = (type: Milestone["type"]) => {
    switch (type) {
      case "til": return <FileText className="h-5 w-5" />;
      case "course": return <GraduationCap className="h-5 w-5" />;
      case "study": return <Award className="h-5 w-5" />;
      case "recognition": return <Trophy className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">My Growthy Milestones</h2>
      
      <div className="space-y-4">
        {timelineData.map(({ month, year, milestones }) => (
          <div key={`${month}-${year}`} className="border rounded-lg">
            <Button
              variant="ghost"
              className="w-full justify-between p-4"
              onClick={() => toggleMonth(`${month} ${year}`)}
            >
              <span className="font-medium">{month} {year}</span>
              {expandedMonths.includes(`${month} ${year}`) ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
            
            {expandedMonths.includes(`${month} ${year}`) && (
              <div className="p-4 pt-0 space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {getMilestoneIcon(milestone.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{milestone.title}</p>
                        <span className="text-sm text-muted-foreground">{milestone.date}</span>
                      </div>
                      
                      {milestone.status && (
                        <div className="mt-2">
                          {milestone.status === "in-progress" && milestone.progress && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>In Progress</span>
                                <span>{milestone.progress}%</span>
                              </div>
                              <Progress value={milestone.progress} className="h-2" />
                            </div>
                          )}
                          {milestone.status === "completed" && (
                            <span className="inline-flex items-center text-sm text-green-600">
                              <Check className="h-4 w-4 mr-1" />
                              Completed
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
