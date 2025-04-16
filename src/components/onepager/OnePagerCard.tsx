
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

interface OnePagerCardProps {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  previewText: string;
}

export function OnePagerCard({
  id,
  title,
  author,
  date,
  readTime,
  likes,
  comments,
  previewText,
}: OnePagerCardProps) {
  return (
    <Link to={`/one-pager/${id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <h3 className="text-lg font-medium line-clamp-2 mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {previewText}
          </p>
          
          <div className="flex items-center mb-2">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>
                {author.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{author.name}</p>
              <p className="text-xs text-muted-foreground">{date} · {readTime}</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-5 py-3 border-t bg-muted/10 flex justify-between">
          <div className="flex items-center text-muted-foreground">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="text-xs">{likes}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{comments}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
