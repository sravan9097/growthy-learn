
import React from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GrowthyLogo } from "@/components/ui/logo";

interface HeaderProps {
  userName?: string;
  userImage?: string;
}

export function Header({ userName = "Sravan Kumar Mulugurthy", userImage }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center">
        <GrowthyLogo />
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={userImage} alt={userName} />
          <AvatarFallback>{userName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{userName}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </header>
  );
}
