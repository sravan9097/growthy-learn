
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userImage?: string;
}

export function Header({ userName = "Sarah Chen", userImage }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative w-96">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search TILs, courses..."
          className="w-full h-9 pl-8 pr-4 rounded-md border bg-background"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={userImage} />
          <AvatarFallback>
            {userName.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{userName}</span>
      </div>
    </header>
  );
}
