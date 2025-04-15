
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
      <div className="max-w-4xl w-full self-center mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mx-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Create a TIL</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h2 className="text-lg font-regular mb-4">Learning isn't just about tech. Your takeaway could be about any of the following aspects</h2>
            <ReflectionThemeSelector 
              selectedTheme={selectedTheme} 
              onSelectTheme={setSelectedTheme}
            />
          </div>

          <div className="space-y-4 mb-6">
            {/* <div>
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
            </div> */}

            <div>
              <label htmlFor="reflection" className="block text-lg mb-2 font-regular">
              What are the key takeaways from your work today?
              </label>
              <Textarea
                id="reflection"
                placeholder="Write your reflection here."
                rows={10}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                required
                className="resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit"  >
              Submit Reflection
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
