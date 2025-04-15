
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Brain, Target, ArrowRight } from "lucide-react";

export default function HomePage() {
  const recentTils = [
    {
      id: 1,
      title: "Understanding Docker Layer Caching",
      author: "Sarah Chen",
      timeAgo: "2 hours ago",
      theme: "Tech Concept"
    },
    {
      id: 2,
      title: "Effective Code Review Practices",
      author: "Michael Ross",
      timeAgo: "4 hours ago",
      theme: "Observation"
    },
    {
      id: 3,
      title: "Managing State in React Applications",
      author: "Emma Wilson",
      timeAgo: "5 hours ago",
      theme: "Tech Concept"
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Welcome to Growthy</h1>
              <p className="text-muted-foreground">Track your learning journey and share knowledge with your team</p>
            </div>
            <Link to="/reflect">
              <Button className="gap-2">
                <Brain className="h-4 w-4" />
                Reflect Now
              </Button>
            </Link>
          </div>

          <Card className="p-6 bg-primary/5 border-none">
            <div className="flex items-start gap-4">
              <Target className="h-6 w-6 text-primary mt-1" />
              <div>
                <h2 className="text-lg font-medium mb-2">Weekly Goal Progress</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Share at least 3 TILs this week to meet your learning goals
                </p>
                <div className="h-2 bg-primary/10 rounded-full w-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '33%' }} />
                </div>
                <p className="text-sm mt-2">1 of 3 TILs completed this week</p>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent TILs</h2>
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentTils.map((til) => (
              <Card key={til.id} className="p-4 hover:bg-accent/5 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{til.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {til.author} · {til.timeAgo}
                    </p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {til.theme}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
