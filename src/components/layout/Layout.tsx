
import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed h-screen z-30"> {/* Added z-index to ensure sidebar stays on top */}
        <Sidebar />
      </div>
      <div className="flex flex-col w-full ml-60"> {/* Keep margin for sidebar width */}
        <Header />
        <main className="flex flex-col p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
