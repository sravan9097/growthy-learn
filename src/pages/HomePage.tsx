
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Brain, FilePlus, Target } from "lucide-react";
import { DevelopingExpertiseCircle } from "@/components/home/DevelopingExpertiseCircle";
import { TILDrawer } from "@/components/til/TILDrawer";
import { sampleTILsByDate } from "@/components/til/DateGroupTILs";
import { OnePagerCard } from "@/components/onepager/OnePagerCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // Sample One-Pager data for feed
  const onePagers = [
    {
      id: "1",
      title: "Understanding Chrome Extension Manifest: Permissions, Scripts, and Web Interactions",
      author: { name: "Sarah Chen", avatar: "" },
      date: "Apr 16, 2025",
      readTime: "5 min read",
      likes: 24,
      comments: 8,
      previewText: "Chrome extensions often need deep interaction with web pages, but misconfigured or overly broad permissions can lead to security risks or limited functionality."
    },
    {
      id: "2",
      title: "Optimizing React Performance: When and How to Use Memoization",
      author: { name: "John Doe", avatar: "" },
      date: "Apr 15, 2025",
      readTime: "7 min read",
      likes: 18,
      comments: 5,
      previewText: "Understanding when to use React.memo, useMemo, and useCallback to avoid unnecessary re-renders and optimize application performance."
    },
    {
      id: "3",
      title: "An Introduction to Web Authentication API",
      author: { name: "Emma Wilson", avatar: "" },
      date: "Apr 14, 2025",
      readTime: "6 min read",
      likes: 15,
      comments: 3,
      previewText: "The Web Authentication API provides a more secure way to handle user authentication using public-key cryptography instead of passwords."
    },
    {
      id: "4",
      title: "Understanding Chrome Extension Manifest: Permissions, Scripts, and Web Interactions",
      author: { name: "Sarah Chen", avatar: "" },
      date: "Apr 16, 2025",
      readTime: "5 min read",
      likes: 24,
      comments: 8,
      previewText: "Chrome extensions often need deep interaction with web pages, but misconfigured or overly broad permissions can lead to security risks or limited functionality."
    },
    {
      id: "5",
      title: "Optimizing React Performance: When and How to Use Memoization",
      author: { name: "John Doe", avatar: "" },
      date: "Apr 15, 2025",
      readTime: "7 min read",
      likes: 18,
      comments: 5,
      previewText: "Understanding when to use React.memo, useMemo, and useCallback to avoid unnecessary re-renders and optimize application performance."
    },
    {
      id: "6",
      title: "An Introduction to Web Authentication API",
      author: { name: "Emma Wilson", avatar: "" },
      date: "Apr 14, 2025",
      readTime: "6 min read",
      likes: 15,
      comments: 3,
      previewText: "The Web Authentication API provides a more secure way to handle user authentication using public-key cryptography instead of passwords."
    }
  ];

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
              <div className="flex flex-row justify-between place-items-center mb-6">
              <h1 className="text-2xl font-semibold ">Dashboard</h1>
              <div className="flex flex-row items-end gap-3">
                <Link to="/reflect">
                  <Button className="gap-2 ">
                    Reflect Now
                  </Button>
                </Link>
                <Link to="/create-one-pager">
                  <Button variant="outline" className="gap-2">
                    Create One-Pager
                  </Button>
                </Link>
              </div>
              </div>
              <DevelopingExpertiseCircle/> 
            </div>
          </div>

          <Card className="p-6 bg-primary/5 border-none">
            <div className="flex items-start gap-4">
              <img src="/GoalIcon-C4DCxICU.svg" className="w-8 h-8"></img>
              <div className="w-full">
                <h2 className="text-lg font-medium mb-2">100% user participation in writing TILs, with every user writing at least 3 TILs a week.</h2>
                <div className="h-2 bg-primary/10 rounded-full w-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '33%' }} />
                </div>
                <p className="text-sm mt-2">1 of 3 TILs completed this week</p>
              </div>
              
            </div>
          </Card>
        </section>

        <section className="mt-10">
          <Tabs defaultValue="feed">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="feed">One-Pager Feed</TabsTrigger>
                <TabsTrigger value="tils">Recent TILs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="mt-0">
                <Link to="/all-one-pagers">
                  <Button variant="ghost" className="gap-2">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </TabsContent>
              
              <TabsContent value="tils" className="mt-0">
                <Link to="/til-dashboard">
                  <Button variant="ghost" className="gap-2">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </TabsContent>
            </div>

            <TabsContent value="feed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {onePagers.map((onePager) => (
                  <OnePagerCard
                    key={onePager.id}
                    id={onePager.id}
                    title={onePager.title}
                    author={onePager.author}
                    date={onePager.date}
                    readTime={onePager.readTime}
                    likes={onePager.likes}
                    comments={onePager.comments}
                    previewText={onePager.previewText}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tils" className="mt-0">
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
            </TabsContent>
          </Tabs>
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
