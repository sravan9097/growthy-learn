
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
      <div>
        <h1 className="text-2xl font-bold mb-6">My Mentees</h1>

        <div className="grid grid-cols-1 gap-6">
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
                      <CardDescription>{mentee.role}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Last Activity</div>
                    <div className="text-sm text-growthy-neutral-500">{mentee.lastActivity}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-growthy-neutral-500">Growth Progress</span>
                    <span className="text-sm font-medium">{mentee.progress}%</span>
                  </div>
                  <Progress value={mentee.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-growthy-neutral-100 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-growthy-neutral-600">TILs Written</h3>
                        <p className="text-2xl font-semibold mt-1">{mentee.tilCount}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-growthy-neutral-100 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-growthy-neutral-600">Courses Taken</h3>
                        <p className="text-2xl font-semibold mt-1">{mentee.courseCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    View Progress
                  </Button>
                </div>
              </CardContent>
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
