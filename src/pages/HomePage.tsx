
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { GoalCard, GoalAlert } from "@/components/home/GoalCard";
import { Button } from "@/components/ui/button";
import { TILCard, TILReactionBar } from "@/components/til/TILCard";
import { TILDrawer } from "@/components/til/TILDrawer";
import { DevelopingExpertiseCircle } from "@/components/home/DevelopingExpertiseCircle";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [selectedTil, setSelectedTil] = useState<any | null>(null);

  // Sample TIL data
  const recentTils = [
    {
      id: 1,
      title: "Kubernetes: One Pod to Rule Them All?",
      content: "TIL: Defining a PodDisruptionBudget (PDB) when an HPA has both minReplicas and maxReplicas set to 1 can lead to unintended issues...",
      author: { name: "Sameer Mohammed Bake", initials: "S" },
      timeAgo: "24 minutes ago",
      reactions: { thumbsUp: 0, insights: 0, confused: 0, comments: 0 }
    },
    {
      id: 2,
      title: "Understanding Proxy Servers and VPNs",
      content: "Today I finally got a clear understanding of proxy servers and VPNs. A proxy server acts like a middleman...",
      author: { name: "Abhishek Pittala", initials: "A" },
      timeAgo: "3 hours ago",
      reactions: { thumbsUp: 2, insights: 1, confused: 0, comments: 3 }
    },
    {
      id: 3,
      title: "Enabling pg_cron in Google Cloud SQL",
      content: "Learned how to enable pg_cron extension in Google Cloud SQL for PostgreSQL...",
      author: { name: "Disha H", initials: "D" },
      timeAgo: "5 hours ago",
      reactions: { thumbsUp: 1, insights: 0, confused: 1, comments: 2 }
    }
  ];

  const yesterdayTils = [
    {
      id: 4,
      title: "Vertex AI: Metadata Magic",
      content: "Discovered how to effectively use Vertex AI's metadata tracking to monitor model lineage...",
      author: { name: "Chirath R", initials: "C" },
      timeAgo: "1 day ago",
      reactions: { thumbsUp: 5, insights: 3, confused: 0, comments: 2 }
    },
    {
      id: 5,
      title: "Understanding GPTs and Foundational Models",
      content: "Learned the key differences between GPTs and other foundational models in terms of training approach and capabilities...",
      author: { name: "Geetha P", initials: "G" },
      timeAgo: "1 day ago",
      reactions: { thumbsUp: 3, insights: 4, confused: 1, comments: 5 }
    }
  ];

  const exampleTilDetail = {
    title: "Kubernetes: One Pod to Rule Them All?",
    content: "TIL: Defining a PodDisruptionBudget (PDB) when an HPA has both minReplicas and maxReplicas set to 1 can lead to unintended issues. While a PDB is meant to ensure availability during voluntary disruptions (like node drains or rolling updates), it conflicts with the HPA's restriction of maintaining exactly one replica. If the only pod needs to be evicted or updated, the PDB will block it to preserve availability, but the HPA won't allow spinning up a second pod to compensate — causing a deadlock. This can stall maintenance tasks or deployments, making the system fragile. For a PDB to be effective, it's best to have at least two replicas so Kubernetes has room to safely manage disruptions.",
    author: { name: "Sameer Mohammed Bake", initials: "S" },
    timeAgo: "24 minutes ago",
    reactions: { thumbsUp: 0, insights: 0, confused: 0, comments: 0 },
    comments: []
  };

  const handleTilClick = (til: any) => {
    setSelectedTil({
      ...til,
      comments: til.id === 2 ? [
        {
          author: { name: "Sandeep Pyata", initials: "S" },
          content: "Great explanation! I was confused about this difference for a long time.",
          timeAgo: "2 hours ago"
        },
        {
          author: { name: "Chirath R", initials: "C" },
          content: "Do you know any good VPN services that you'd recommend?",
          timeAgo: "1 hour ago"
        },
        {
          author: { name: "Abhishek Pittala", initials: "A" },
          content: "I've had good experiences with NordVPN and ExpressVPN for personal use.",
          timeAgo: "45 minutes ago"
        }
      ] : []
    });
  };

  return (
    <Layout>
      <div>
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </span>
              What is DEC?
              <span className="text-growthy-neutral-500 font-normal">(Developing Expertise Culture)</span>
            </h2>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="mb-4">
              <p>It is a recipe for building expertise at BeautifulCode, centred around</p>
              <p className="text-primary font-medium">3 key-practices.</p>
            </div>
            
            <h3 className="font-semibold mb-2">How does it benefit you?</h3>
            <ul className="list-disc list-inside space-y-2 text-growthy-neutral-500">
              <li>You will solidify your understanding with Writing and feedback on your work.</li>
              <li>You will develop habits such as Researching, Experimenting and Writing, which differentiates you in this AI world</li>
            </ul>
            
            <div className="mt-6">
              <DevelopingExpertiseCircle />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">DEC Goals</h2>
          <GoalCard
            title="Our Goal"
            description={
              <div className="flex items-center">
                <span className="text-lg font-semibold text-growthy-green-500">100%</span>
                <span className="ml-1">user participation in writing TILs, with every user writing at least</span>
                <span className="text-lg font-semibold text-growthy-green-500 mx-1">3 TILs</span>
                <span>a week.</span>
              </div>
            }
          >
            <div>
              <Button variant="link" className="text-primary p-0 h-auto">
                Why it matters?
              </Button>
            </div>
            <GoalAlert message="You haven't met the weekly goal yet. Post a TIL today" />
          </GoalCard>
        </section>

        <section className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent TILs</h2>
            <Link to="/reflect">
              <Button className="bg-growthy-green-500 hover:bg-growthy-green-600">
                Reflect Now
              </Button>
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Today (3)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentTils.map((til) => (
                <TILCard
                  key={til.id}
                  title={til.title}
                  content={til.content}
                  author={til.author}
                  timeAgo={til.timeAgo}
                  onClick={() => handleTilClick(til)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Yesterday (17)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {yesterdayTils.map((til) => (
                <TILCard
                  key={til.id}
                  title={til.title}
                  content={til.content}
                  author={til.author}
                  timeAgo={til.timeAgo}
                  onClick={() => handleTilClick(til)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {selectedTil && (
        <TILDrawer
          isOpen={!!selectedTil}
          onClose={() => setSelectedTil(null)}
          til={selectedTil}
        />
      )}
    </Layout>
  );
}
