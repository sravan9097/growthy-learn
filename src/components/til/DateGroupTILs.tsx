
import React, { useState } from "react";
import { TILCard } from "./TILCard";
import { TILDrawer } from "./TILDrawer";

interface TILData {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  timeAgo: string;
  date: string;
  reactions: {
    thumbsUp: number;
    insights: number;
    confused: number;
    comments: number;
  };
  comments: {
    author: {
      name: string;
      avatar?: string;
      initials?: string;
    };
    content: string;
    timeAgo: string;
  }[];
}

interface DateGroupProps {
  date: string;
  tils: TILData[];
}

export function DateGroupTILs({ date, tils }: DateGroupProps) {
  const [selectedTIL, setSelectedTIL] = useState<TILData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTILClick = (til: TILData) => {
    setSelectedTIL(til);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{date}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tils.map((til) => (
          <TILCard
            key={til.id}
            title={til.title}
            content={til.content}
            author={til.author}
            timeAgo={til.timeAgo}
            onClick={() => handleTILClick(til)}
          />
        ))}
      </div>
      
      {selectedTIL && (
        <TILDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          til={selectedTIL}
        />
      )}
    </div>
  );
}

// Sample TIL data organized by date
export const sampleTILsByDate = [
  {
    date: "Today, April 15th",
    tils: [
      {
        id: "1",
        title: "How React's Fiber Architecture Works",
        content: "Today I learned about React's Fiber architecture which allows for incremental rendering. It breaks rendering work into chunks and can pause and resume work to yield to browser tasks like animation and user input, creating a smoother user experience.",
        author: { name: "Sarah Chen", initials: "SC" },
        timeAgo: "2 hours ago",
        date: "2025-04-15",
        reactions: { thumbsUp: 5, insights: 3, confused: 0, comments: 2 },
        comments: [
          { author: { name: "Alex Johnson", initials: "AJ" }, content: "This is fascinating! Do you have any resources to learn more about this?", timeAgo: "1 hour ago" },
          { author: { name: "Michael Smith", initials: "MS" }, content: "I've been wondering how React handles this. Thanks for sharing!", timeAgo: "30 mins ago" }
        ]
      },
      {
        id: "2",
        title: "CSS Container Queries are Game-Changing",
        content: "Container queries allow you to apply styles based on the size of a container rather than the viewport. This is revolutionary for component-based design systems as components can now adapt to their container regardless of viewport size.",
        author: { name: "Jordan Lee", initials: "JL" },
        timeAgo: "4 hours ago",
        date: "2025-04-15",
        reactions: { thumbsUp: 8, insights: 4, confused: 1, comments: 3 },
        comments: [
          { author: { name: "Priya Patel", initials: "PP" }, content: "I've been waiting for this feature for years! Can't wait to use it in production.", timeAgo: "3 hours ago" },
          { author: { name: "David Wilson", initials: "DW" }, content: "What's browser support like these days?", timeAgo: "2 hours ago" },
          { author: { name: "Sarah Chen", initials: "SC" }, content: "All modern browsers support it now. It's safe to use!", timeAgo: "1 hour ago" }
        ]
      },
      {
        id: "3",
        title: "Optimizing API Calls with RTK Query",
        content: "RTK Query (part of Redux Toolkit) provides a powerful way to handle data fetching and caching. It dramatically reduces boilerplate and handles caching, loading states, and updates with minimal effort.",
        author: { name: "Carlos Mendez", initials: "CM" },
        timeAgo: "8 hours ago",
        date: "2025-04-15",
        reactions: { thumbsUp: 12, insights: 7, confused: 2, comments: 4 },
        comments: [
          { author: { name: "Emily Clarke", initials: "EC" }, content: "This has been a game-changer for our project. Reduced our code by 30%!", timeAgo: "7 hours ago" },
          { author: { name: "Tom Jackson", initials: "TJ" }, content: "How does it compare to React Query?", timeAgo: "6 hours ago" },
          { author: { name: "Carlos Mendez", initials: "CM" }, content: "Similar concepts but tighter Redux integration. Both are excellent choices.", timeAgo: "5 hours ago" },
          { author: { name: "Lisa Brown", initials: "LB" }, content: "Just implemented this yesterday. Already seeing improvements!", timeAgo: "2 hours ago" }
        ]
      }
    ]
  },
  {
    date: "Yesterday, April 14th",
    tils: [
      {
        id: "4",
        title: "The Power of CSS :has() Selector",
        content: "The :has() pseudo-class in CSS allows you to select an element based on its contents. For example, p:has(img) selects paragraphs containing images. This enables parent selection which wasn't previously possible with CSS alone.",
        author: { name: "Maya Watson", initials: "MW" },
        timeAgo: "Yesterday",
        date: "2025-04-14",
        reactions: { thumbsUp: 15, insights: 9, confused: 1, comments: 5 },
        comments: [
          { author: { name: "James Kim", initials: "JK" }, content: "This is the CSS feature I've been waiting for! Game changer for complex layouts.", timeAgo: "Yesterday" },
          { author: { name: "Sophia Rodriguez", initials: "SR" }, content: "Just tried this out. So powerful for responsive designs!", timeAgo: "Yesterday" }
        ]
      },
      {
        id: "5",
        title: "Using Intersection Observer for Lazy Loading",
        content: "Intersection Observer API provides a way to observe when an element enters or exits the viewport. This is perfect for implementing lazy loading of images or infinite scrolling with much better performance than scroll event listeners.",
        author: { name: "Daniel Park", initials: "DP" },
        timeAgo: "Yesterday",
        date: "2025-04-14",
        reactions: { thumbsUp: 10, insights: 6, confused: 0, comments: 3 },
        comments: [
          { author: { name: "Nathan Chen", initials: "NC" }, content: "We implemented this last week and saw huge performance improvements.", timeAgo: "Yesterday" },
          { author: { name: "Olivia Martinez", initials: "OM" }, content: "Do you have a code example you could share?", timeAgo: "Yesterday" },
          { author: { name: "Daniel Park", initials: "DP" }, content: "Sure, I'll post a follow-up TIL with some code snippets tomorrow!", timeAgo: "Yesterday" }
        ]
      }
    ]
  },
  {
    date: "April 13th",
    tils: [
      {
        id: "6",
        title: "TypeScript Utility Types Simplified My Code",
        content: "TypeScript's built-in utility types like Partial<T>, Pick<T>, and Omit<T> have dramatically simplified my type definitions. Instead of writing complex mapped types, these utilities handle common transformations elegantly.",
        author: { name: "Sarah Chen", initials: "SC" },
        timeAgo: "2 days ago",
        date: "2025-04-13",
        reactions: { thumbsUp: 14, insights: 8, confused: 2, comments: 4 },
        comments: [
          { author: { name: "Ryan Thompson", initials: "RT" }, content: "ReturnType<T> is also super useful for working with function return values.", timeAgo: "2 days ago" },
          { author: { name: "Jessica Wong", initials: "JW" }, content: "I love Record<K,T> for creating dictionaries with specific key/value types.", timeAgo: "2 days ago" }
        ]
      },
      {
        id: "7",
        title: "The Magic of CSS Grid Auto-Fit and Minmax",
        content: "Using grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) creates responsive grid layouts without media queries. Elements automatically wrap based on container width while maintaining consistent sizing.",
        author: { name: "Alex Johnson", initials: "AJ" },
        timeAgo: "2 days ago",
        date: "2025-04-13",
        reactions: { thumbsUp: 20, insights: 15, confused: 1, comments: 6 },
        comments: [
          { author: { name: "Kayla Williams", initials: "KW" }, content: "This is my go-to for gallery layouts. So clean and simple!", timeAgo: "2 days ago" },
          { author: { name: "Benjamin Taylor", initials: "BT" }, content: "Wow, this just replaced about 50 lines of media queries in my project.", timeAgo: "2 days ago" }
        ]
      },
      {
        id: "8",
        title: "NextJS Server Components Changed How I Structure Apps",
        content: "NextJS React Server Components allow you to run components on the server, reducing bundle size and improving performance. This enables new patterns for data fetching and state management by keeping data server-side when possible.",
        author: { name: "Lisa Brown", initials: "LB" },
        timeAgo: "2 days ago",
        date: "2025-04-13",
        reactions: { thumbsUp: 18, insights: 12, confused: 3, comments: 5 },
        comments: [
          { author: { name: "Chris Davis", initials: "CD" }, content: "The mental model takes some getting used to, but it's worth it!", timeAgo: "2 days ago" },
          { author: { name: "Sarah Chen", initials: "SC" }, content: "How are you handling state that needs to be client-side?", timeAgo: "1 day ago" },
          { author: { name: "Lisa Brown", initials: "LB" }, content: "Using 'use client' boundaries very strategically. Keeping most UI server-rendered.", timeAgo: "1 day ago" }
        ]
      }
    ]
  }
];
