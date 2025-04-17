
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
    <header className="w-full sticky top-0 z-40 flex justify-between items-end px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="col-span-1 flex h-full justify-start items-center">
        <a className="flex" href="/"> 
        
        <img src="/GrowthyIcon-Djqs-wG6.svg" alt="Growthy Icon" className="w-8 h-8 mr-2 hover:cursor-pointer"></img>
          <div className="font-medium text-2xl text-stone-900 hover:cursor-pointer">Growthy</div>
        </a>
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
