
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Brain, Target, ArrowRight } from "lucide-react";
import { DevelopingExpertiseCircle } from "@/components/home/DevelopingExpertiseCircle";
import { TILDrawer } from "@/components/til/TILDrawer";
import { sampleTILsByDate } from "@/components/til/DateGroupTILs";

export default function HomePage() {
  const [selectedTIL, setSelectedTIL] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Flatten all TILs for the recent section
  const allTils = sampleTILsByDate.flatMap(group => group.tils);
  
  // Get the most recent 6 TILs (3 for today, 3 for yesterday)
  const recentTils = allTils.slice(0, 6);
  
  // Group TILs by "Today" and "Yesterday"
  const todayTils = recentTils.slice(0, 3);
  const yesterdayTils = recentTils.slice(3, 6);

  const handleTILClick = (til: any) => {
    setSelectedTIL(til);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Layout>
      <div className="max-w-5xl self-center w-full">
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
              <DevelopingExpertiseCircle/> 
            </div>
          </div>

          <Card className="p-6 bg-primary/5 border-none">
            <div className="flex items-start gap-4">
              <img src="/GoalIcon-C4DCxICU.svg" className="w-8 h-8"></img>
              <div className=" w-full">
                <h2 className="text-lg font-medium mb-2">100% user participation in writing TILs, with every user writing at least 3 TILs a week.</h2>
                <div className="h-2 bg-primary/10 rounded-full w-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '33%' }} />
                </div>
                <p className="text-sm mt-2">1 of 3 TILs completed this week</p>
              </div>
              <Link to="/reflect">
              <Button className="gap-2">
                Reflect Now
              </Button>
            </Link>
            </div>
          </Card>
        </section>

        <section>
          <div className="flex items-center justify-between my-6">
            <h2 className="text-xl font-semibold">Recent TILs</h2>
            <Link to="/til-dashboard">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-normal">Today</h3>
            {todayTils.map((til) => (
              <Card 
                key={til.id} 
                className="px-3 py-2 hover:bg-accent/5 transition-colors cursor-pointer"
                onClick={() => handleTILClick(til)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-normal">{til.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-normal">Yesterday</h3>
            {yesterdayTils.map((til) => (
              <Card 
                key={til.id} 
                className="px-3 py-2 hover:bg-accent/5 transition-colors cursor-pointer"
                onClick={() => handleTILClick(til)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-normal">{til.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {selectedTIL && (
          <TILDrawer
            isOpen={isDrawerOpen}
            onClose={closeDrawer}
            til={selectedTIL}
          />
        )}
      </div>
    </Layout>
  );
}
