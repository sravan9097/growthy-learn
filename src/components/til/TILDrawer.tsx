
import React, { useState } from "react";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TILReactionBar } from "./TILCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface TILDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  til: {
    title: string;
    content: string;
    author: {
      name: string;
      avatar?: string;
      initials?: string;
    };
    timeAgo: string;
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
  };
}

export function TILDrawer({ isOpen, onClose, til }: TILDrawerProps) {
  const [newComment, setNewComment] = useState("");
  const [localReactions, setLocalReactions] = useState(til.reactions);
  
  if (!isOpen) return null;

  const handlePostComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before posting.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send the comment to an API
    toast({
      title: "Comment posted",
      description: "Your comment has been added to the discussion.",
    });
    
    // Clear the input
    setNewComment("");
    
    // Update comment count
    setLocalReactions({
      ...localReactions,
      comments: localReactions.comments + 1
    });
  };
  
  const handleReaction = (type: string) => {
    // In a real app, this would send the reaction to an API
    const reactions = { ...localReactions };
    
    if (type === 'thumbsUp') {
      reactions.thumbsUp += 1;
    } else if (type === 'insights') {
      reactions.insights += 1;
    } else if (type === 'confused') {
      reactions.confused += 1;
    }
    
    setLocalReactions(reactions);
    
    toast({
      title: "Reaction added",
      description: "Your reaction has been recorded.",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Today I Learned</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Avatar>
              <AvatarImage src={til.author.avatar} alt={til.author.name} />
              <AvatarFallback>{til.author.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{til.author.name}</div>
              <div className="text-sm text-muted-foreground">{til.timeAgo}</div>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-2">{til.title}</h3>
          <div className="mb-4 text-growthy-neutral-500">
            <p>{til.content}</p>
          </div>

          <TILReactionBar reactions={localReactions} onReact={handleReaction} />

          <Separator className="my-4" />

          <div className="space-y-4">
            {til.comments.map((comment, index) => (
              <div key={index} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-secondary p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-secondary/50">
          <Textarea 
            placeholder="Add a comment..." 
            className="resize-none mb-2" 
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handlePostComment}>Post Comment</Button>
        </div>
      </div>
    </div>
  );
}
