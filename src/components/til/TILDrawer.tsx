
import React, { useState } from "react";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TILReactionBar } from "./TILCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/utils";

interface TILDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  til: {
    id?: string; // Make id optional to fix the TypeScript error
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
  };
  allTilsForDate?: Array<{
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
  }>;
}

export function TILDrawer({ isOpen, onClose, til, allTilsForDate }: TILDrawerProps) {
  const [newComment, setNewComment] = useState("");
  const [localReactions, setLocalReactions] = useState(til.reactions);
  const [selectedTil, setSelectedTil] = useState(til);
  
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

  const displayDate = til.date ? formatDate(new Date(til.date)) : "Today";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Today | {displayDate}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          {(allTilsForDate || [selectedTil]).map((currentTil, index) => (
            <div key={currentTil.id || index} className="p-4 border-b">
              <div className="flex items-center space-x-2 mb-4">
                <Avatar>
                  <AvatarImage src={currentTil.author.avatar} alt={currentTil.author.name} />
                  <AvatarFallback>{currentTil.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{currentTil.author.name}</div>
                  <div className="text-sm text-muted-foreground">{currentTil.timeAgo}</div>
                </div>
              </div>

              {currentTil.title ? (
                <h3 className="text-lg font-medium mb-2">{currentTil.title}</h3>
              ) : (
                <h3 className="text-lg font-medium mb-2">
                  {currentTil.content.split('.')[0]}.
                </h3>
              )}
              
              <div className="mb-4 text-growthy-neutral-500">
                <p>{currentTil.content}</p>
              </div>

              <TILReactionBar reactions={localReactions} onReact={handleReaction} />

              <div className="mt-4 space-y-4">
                {currentTil.comments.map((comment, cIndex) => (
                  <div key={cIndex} className="flex gap-3">
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
                        <Button variant="ghost" size="sm" className="text-xs mt-1">Reply</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
