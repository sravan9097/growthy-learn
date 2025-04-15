
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ReflectionThemeSelector } from "@/components/til/ReflectionThemeCard";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReflectPage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [reflection, setReflection] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      theme: selectedTheme,
      title,
      reflection
    });
    // In a real app, we would submit this to an API
    // Then navigate back to home or show a success message
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Create a TIL Reflection</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Choose a Reflection Theme</h2>
            <ReflectionThemeSelector 
              selectedTheme={selectedTheme} 
              onSelectTheme={setSelectedTheme}
            />
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="title" className="block mb-2 font-medium">
                Title
              </label>
              <Input
                id="title"
                placeholder="Enter a concise title for your TIL"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="reflection" className="block mb-2 font-medium">
                What did you learn?
              </label>
              <Textarea
                id="reflection"
                placeholder="Share your reflection in detail. What did you learn? Why is it important? How will you apply this knowledge?"
                rows={10}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                required
                className="resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-growthy-green-500 hover:bg-growthy-green-600" disabled={!selectedTheme || !title || !reflection}>
              Submit Reflection
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
