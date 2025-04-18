
import { ExternalLink, Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function GoalSummaryCard() {
  const progress = 75; // Example progress value

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-8">
              <div className="flex flex-row justify-between place-items-center mb-2">
                <h1 className="text-2xl font-semibold">Growth Journey</h1>
              </div>
      </div>
      <h2 className="text-xl font-semibold mb-6">How are you impacting BC?</h2>
      <div className="flex items-start gap-4 border border-gray-100 p-6 rounded-xl shadow">
        
        <img src="/GoalIcon-C4DCxICU.svg" className="w-10 h-10 "/>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Posting TIL at least 3 times a week</h2>
          <p className="text-muted-foreground mb-4"></p>
          
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
          
          <Button variant="link" className="mt-1 px-0">
            See how others are making an impact
            <ExternalLink className="w-4 h-4 text-primary"/>
          </Button>
        </div>
      </div>
    </div>
  );
}
