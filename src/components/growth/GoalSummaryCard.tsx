
import { Target, Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function GoalSummaryCard() {
  const progress = 75; // Example progress value

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <Target className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">How are you impacting BC?</h2>
          <p className="text-muted-foreground mb-4">Primary Goal: Posting TIL at least 3 times a week</p>
          
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm">Met goal 3 times this month</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-red-100 p-2 rounded-full">
                <X className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm">Missed goal 1 time this month</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Monthly Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Button variant="outline" className="mt-2">
            See how others are making an impact
          </Button>
        </div>
      </div>
    </div>
  );
}
