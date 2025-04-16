
import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed h-screen"> {/* Fixed position for sidebar */}
        <Sidebar />
      </div>
      <div className="flex flex-col w-full ml-60"> {/* Add margin to account for sidebar width */}
        <Header />
        <main className="flex flex-col p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
