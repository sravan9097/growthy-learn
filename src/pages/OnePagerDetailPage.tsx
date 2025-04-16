
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare, ThumbsUp } from "lucide-react";

export default function OnePagerDetailPage() {
  const { id } = useParams();
  
  // Sample data - in a real app this would come from an API
  const onePager = {
    id: id || "1",
    title: "Understanding Chrome Extension Manifest: Permissions, Scripts, and Web Interactions",
    author: {
      name: "Sarah Chen",
      avatar: "",
    },
    date: "Apr 16, 2025",
    readTime: "5 min read",
    likes: 24,
    comments: 8,
    content: {
      problemStatement: "Chrome extensions often need deep interaction with web pages, but misconfigured or overly broad permissions can lead to security risks or limited functionality. Understanding how manifest.json controls these interactions is crucial, especially for extensions like screen capture or content augmentation tools that operate across many sites.",
      howItWorks: "The manifest.json file is the backbone of any Chrome extension. It defines the extension's metadata, required permissions, and how it behaves in the browser.\n\nFor tools like Awesome Screenshot & Screen Recorder, it enables interaction with all web pages using the host_permissions field (<all_urls>), which grants access across websites. Core permissions like tabs, activeTab, scripting, and desktopCapture allow capturing, recording, and modifying page content.\n\nThe content_scripts section automatically injects scripts to enable DOM interactions like highlighting.\n\nThe background service worker handles tasks like listening for capture events, while web_accessible_resources makes internal files accessible within page contexts. This configuration ensures smooth integration and functionality across any site, maintaining both flexibility and control.",
      useCases: "1. Screen capturing tools use host_permissions to access and record content from any open tab or website.\n2. Content enhancement extensions inject scripts into web pages to add features like annotations or translations, based on permissions set in manifest.json.",
      conclusion: "A well-structured manifest.json ensures secure and effective page interaction. Developers should use specific permissions where possible and follow Chrome's latest extension guidelines to maintain user trust and platform compliance."
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto w-full pb-10">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <article>
          <h1 className="text-3xl font-bold mb-4">{onePager.title}</h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={onePager.author.avatar} />
                <AvatarFallback>
                  {onePager.author.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{onePager.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {onePager.date} · {onePager.readTime}
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="flex gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{onePager.likes}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{onePager.comments}</span>
              </Button>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed mb-8">
              {onePager.content.problemStatement}
            </p>
            
            <div className="h-80 bg-muted rounded-md mb-8">
              {/* Placeholder for image */}
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How does it work?</h2>
            <div className="whitespace-pre-line mb-8">
              {onePager.content.howItWorks}
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Use Cases</h2>
            <div className="whitespace-pre-line mb-8">
              {onePager.content.useCases}
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
            <div className="whitespace-pre-line mb-8">
              {onePager.content.conclusion}
            </div>
          </div>
        </article>
        
        <Separator className="my-10" />
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <p className="text-muted-foreground italic">Comments feature coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}
