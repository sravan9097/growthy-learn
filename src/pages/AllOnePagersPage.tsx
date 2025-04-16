
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { OnePagerCard } from "@/components/onepager/OnePagerCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AllOnePagersPage() {
  // Sample One-Pager data (reusing the same data from HomePage)
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
    },
    {
      id: "7",
      title: "Understanding Web Components",
      author: { name: "Sarah Chen", avatar: "" },
      date: "Apr 12, 2025",
      readTime: "8 min read",
      likes: 20,
      comments: 12,
      previewText: "Web components allow you to create reusable custom elements with encapsulated functionality that can be used across different web applications."
    },
    {
      id: "8",
      title: "GraphQL vs REST: A Practical Comparison",
      author: { name: "John Doe", avatar: "" },
      date: "Apr 10, 2025",
      readTime: "9 min read",
      likes: 22,
      comments: 10,
      previewText: "Comparing GraphQL and REST API architectures, explaining the benefits and tradeoffs of each approach with practical examples."
    }
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">All One-Pagers</h1>
          <Link to="/create-one-pager">
            <Button>Create One-Pager</Button>
          </Link>
        </div>

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
      </div>
    </Layout>
  );
}
