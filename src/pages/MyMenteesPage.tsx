
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MessageSquare, BarChart2 } from "lucide-react";

export default function MyMenteesPage() {
  const mentees = [
    {
      id: 1,
      name: "Durga Prakash Madishetty",
      role: "Frontend Developer",
      progress: 45,
      tilCount: 12,
      courseCount: 2,
      lastActivity: "2 days ago"
    },
    {
      id: 2,
      name: "Disha H",
      role: "Backend Developer",
      progress: 72,
      tilCount: 24,
      courseCount: 3,
      lastActivity: "Today"
    },
    {
      id: 3,
      name: "Chirath R",
      role: "Full Stack Developer",
      progress: 60,
      tilCount: 18,
      courseCount: 1,
      lastActivity: "Yesterday"
    }
  ];

  return (
    <Layout>
      <div className="max-w-5xl w-full self-center mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Mentees</h1>

        <div className=" flex w-full flex-wrap flex-col gap-6">
          {mentees.map((mentee) => (
            <Card key={mentee.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{mentee.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{mentee.name}</CardTitle>
                      {/* <CardDescription>{mentee.role}</CardDescription> */}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Last Activity</div>
                    <div className="text-sm text-growthy-neutral-500">{mentee.lastActivity}</div>
                  </div>
                </div>
              </CardHeader>
              
              <div className="p-4 flex flex-row g-3 justify-center" >
                <div className="mb-4 mr-8 w-full">
                  <div className="flex flex-row justify-between mb-1">
                    <span className="text-sm text-growthy-neutral-500">Course Progress</span>
                    <span className="text-sm font-medium">{mentee.progress}%</span>
                  </div>
                  <Progress value={mentee.progress} className="h-2" />
                </div>
                
              
                  <Button variant="outline" >
                    <BarChart2 className="mr-2 h-4 w-4" />
                    View Course Progress
                  </Button>
                
              </div>
            </Card>
          ))}
        </div>
        
        {mentees.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">No mentees assigned yet</h3>
            <p className="text-growthy-neutral-500">You'll see your mentees here once they're assigned to you.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
