
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, ThumbsDown, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TILCardProps {
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  timeAgo: string;
  onClick?: () => void;
}

export function TILCard({ title, content, author, timeAgo, onClick }: TILCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center space-x-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">{author.name}</div>
            <div className="text-xs text-muted-foreground">{timeAgo}</div>
          </div>
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-growthy-neutral-500 line-clamp-2">{content}</p>
      </CardContent>
    </Card>
  );
}

export function TILReactionBar({ 
  reactions = { thumbsUp: 0, insights: 0, confused: 0, comments: 0 },
  onReact
}: { 
  reactions: { thumbsUp: number; insights: number; confused: number; comments: number };
  onReact?: (type: string) => void;
}) {
  const reactionButtons = [
    { type: 'thumbsUp', icon: ThumbsUp, count: reactions.thumbsUp, tooltip: 'Kudos' },
    { type: 'insights', icon: BrainCircuit, count: reactions.insights, tooltip: 'Insightful' },
    { type: 'confused', icon: ThumbsDown, count: reactions.confused, tooltip: 'Didn\'t Get It' },
    { type: 'comments', icon: MessageSquare, count: reactions.comments, tooltip: 'Comment' },
  ];

  return (
    <div className="flex items-center justify-between pt-2 border-t">
      {reactionButtons.map((reaction) => (
        <Button
          key={reaction.type}
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-1 text-growthy-neutral-400",
            reaction.count > 0 && "text-growthy-green-500 font-medium"
          )}
          onClick={() => onReact?.(reaction.type)}
        >
          <reaction.icon className="h-4 w-4" />
          <span>{reaction.count > 0 ? reaction.count : '--'}</span>
        </Button>
      ))}
    </div>
  );
}
