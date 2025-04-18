
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { GoalSummaryCard } from "@/components/growth/GoalSummaryCard";
import { MilestonesTimeline } from "@/components/growth/MilestonesTimeline";
import { JourneyStats } from "@/components/growth/JourneyStats";

export default function GrowthJourneyPage() {
  return (
    <Layout>
      <div className="max-w-5xl w-full self-center mx-auto">
        <GoalSummaryCard />
        <JourneyStats />
        <MilestonesTimeline />
      </div>
    </Layout>
  );
}
