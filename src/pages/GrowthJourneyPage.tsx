
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function GrowthJourneyPage() {
  // Sample data for the growth journey timeline
  const years = [2025, 2024, 2023];
  const currentYear = 2025;
  
  const monthlyData = [
    { month: "January", tils: 12, coursesCompleted: 1, badges: 2 },
    { month: "February", tils: 8, coursesCompleted: 0, badges: 1 },
    { month: "March", tils: 15, coursesCompleted: 2, badges: 3 },
    { month: "April", tils: 7, coursesCompleted: 1, badges: 0 },
  ];

  const achievements = [
    { name: "First TIL", date: "Jan 12, 2025", description: "Posted your first Today I Learned" },
    { name: "Consistent Learner", date: "Feb 21, 2025", description: "Posted TILs for 5 consecutive days" },
    { name: "Course Master", date: "Mar 15, 2025", description: "Completed your first course with distinction" },
    { name: "Thought Leader", date: "Apr 2, 2025", description: "Received 50+ reactions on your TILs" },
  ];

  return (
    <Layout>
      <div className="max-w-4xl w-full self-center mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Growth Journey
            </Button>
          </Link>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Growth Journey</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {currentYear}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Achievements section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="border rounded-lg p-4 bg-growthy-green-50">
                <h3 className="font-medium">{achievement.name}</h3>
                <p className="text-sm text-growthy-neutral-500 mb-2">{achievement.date}</p>
                <p className="text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline section */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>
          
          <div className="space-y-6">
            {monthlyData.map((data, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">{data.month}</h3>
                  
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-growthy-green-50 p-3 rounded-lg">
                    <div className="text-xl font-semibold">{data.tils}</div>
                    <div className="text-sm text-growthy-neutral-500">TILs</div>
                  </div>
                  <div className="bg-growthy-green-50 p-3 rounded-lg">
                    <div className="text-xl font-semibold">{data.coursesCompleted}</div>
                    <div className="text-sm text-growthy-neutral-500">Courses</div>
                  </div>
                  <div className="bg-growthy-green-50 p-3 rounded-lg">
                    <div className="text-xl font-semibold">{data.badges}</div>
                    <div className="text-sm text-growthy-neutral-500">Badges</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </Layout>
  );
}
