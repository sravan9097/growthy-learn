
import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col w-full justify-start ">
        <Header />
        <main className="flex flex-col p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
