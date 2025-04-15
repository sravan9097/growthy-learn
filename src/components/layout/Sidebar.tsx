
import React from "react";
import { cn } from "@/lib/utils";
import { Home, BookOpen, Video, Users, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NavItem = ({ 
  icon: Icon, 
  label, 
  to, 
  isActive 
}: { 
  icon: React.ElementType; 
  label: string; 
  to: string; 
  isActive: boolean; 
}) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3 font-normal",
          isActive ? "bg-sidebar-accent text-primary font-medium" : "text-sidebar-foreground"
        )}
      >
        <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-sidebar-foreground")} />
        {label}
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Course Learn", path: "/courses" },
    { icon: Video, label: "My Learnings", path: "/my-learnings" },
    { icon: Users, label: "My Mentees", path: "/my-mentees" },
  ];

  return (
    <div className="flex h-screen w-60 flex-col bg-sidebar-background border-r">
      <div className="p-4">
        <div className="py-2">
          {/* Placeholder for Publish button if needed */}
          <Button variant="ghost" className="w-full justify-start gap-3 px-3 font-normal text-sidebar-foreground mb-4">
            Publish
          </Button>
        </div>
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              to={item.path}
              isActive={currentPath === item.path}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto p-4">
        <Link to="/logout">
          <Button variant="ghost" className="w-full justify-start gap-3 px-3 font-normal text-sidebar-foreground">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
}
