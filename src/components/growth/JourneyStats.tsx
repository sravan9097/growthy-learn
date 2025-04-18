
import { LineChart, BarChart, Target } from "lucide-react";

export function JourneyStats() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Journey So Far</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
          <div className="bg-primary/10 p-2 rounded-full">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-semibold">45</p>
            <p className="text-sm text-muted-foreground">Total TILs</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
          <div className="bg-primary/10 p-2 rounded-full">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-semibold">12</p>
            <p className="text-sm text-muted-foreground">Courses Completed</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
          <div className="bg-primary/10 p-2 rounded-full">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-semibold">8</p>
            <p className="text-sm text-muted-foreground">Recognized TILs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
