
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ReflectionThemeSelector } from "@/components/til/ReflectionThemeCard";
import { ArrowLeft, Wand2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function ReflectPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [reflection, setReflection] = useState("");
  const [improvedReflection, setImprovedReflection] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [useImproved, setUseImproved] = useState(false);
  const [showAIEnhancements, setShowAIEnhancements] = useState(false);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState<number | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Simulate AI-generated title suggestions
  const generateTitles = () => {
    const sampleTitles = [
      "Understanding React Hooks: A Deep Dive",
      "The Evolution of State Management in React",
      "React Performance Optimizations You Should Know",
      "How Hooks Changed My Approach to React"
    ];
    setSuggestedTitles(sampleTitles);
  };

  // Generate improved reflection
  useEffect(() => {
    const enhanceReflection = async () => {
      if (reflection.length > 30) {
        if (!showAIEnhancements) {
          setShowAIEnhancements(true);
        }
        
        // Simulate AI processing
        setIsProcessing(true);
        
        // This would be replaced with an actual AI call
        setTimeout(() => {
          setImprovedReflection(
            reflection + "\n\nAdditional insights: This approach not only improves code maintainability but also aligns with modern React best practices. Consider expanding your implementation to include error boundaries for even more robust applications."
          );
          
          // Generate titles only if we don't have them yet
          if (suggestedTitles.length === 0) {
            generateTitles();
          }
          
          setIsProcessing(false);
        }, 1000);
      }
    };

    const timer = setTimeout(() => {
      if (reflection.length > 30) {
        enhanceReflection();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [reflection]);

  // Simulate auto-save
  useEffect(() => {
    if (reflection.length > 0 || title.length > 0) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [reflection, title, selectedTheme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      theme: selectedTheme,
      title: title || (selectedTitleIndex !== null ? suggestedTitles[selectedTitleIndex] : ""),
      reflection: useImproved ? improvedReflection : reflection
    });
    
    toast({
      title: "Reflection Submitted",
      description: "Your TIL has been successfully saved.",
    });
    
    navigate("/");
  };

  return (
    <Layout>
      <div className="max-w-6xl w-full self-center mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
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
                {lastSaved && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {`Saved ${Math.floor((new Date().getTime() - lastSaved.getTime()) / 1000) < 10 
                      ? 'just now' 
                      : `${Math.floor((new Date().getTime() - lastSaved.getTime()) / 60000)} minutes ago`}`}
                  </p>
                )}
              </div>
            </div>

            {showAIEnhancements && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">AI Enhanced Version</h3>
                  {!isProcessing && (
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="improveClarity" className="text-sm">Improve Clarity / Flow</Label>
                      <Switch
                        id="improveClarity"
                        checked={useImproved}
                        onCheckedChange={setUseImproved}
                      />
                    </div>
                  )}
                </div>
                
                <Card className={cn(
                  "bg-primary/5 border-primary/10",
                  useImproved && "border-primary"
                )}>
                  <CardContent className="p-4">
                    {isProcessing ? (
                      <div className="flex items-center justify-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center mb-2 text-sm text-primary">
                          <Wand2 className="h-4 w-4 mr-1" />
                          <span>AI Suggested</span>
                        </div>
                        <p className="whitespace-pre-line">{improvedReflection}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {suggestedTitles.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Suggested Titles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {suggestedTitles.map((title, index) => (
                  <Card 
                    key={index}
                    className={cn(
                      "cursor-pointer hover:border-primary transition-colors",
                      selectedTitleIndex === index && "border-primary bg-primary/5"
                    )}
                    onClick={() => setSelectedTitleIndex(index)}
                  >
                    <CardContent className="p-3 text-sm">
                      {title}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={generateTitles}
                  className="text-xs"
                >
                  🎲 Generate More Titles
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedTitleIndex(null);
                    setTitle("");
                  }}
                  className="text-xs"
                >
                  🚫 Skip Title
                </Button>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 font-medium">
              Custom Title (Optional)
            </label>
            <Input
              id="title"
              placeholder="Enter a concise title for your TIL"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSelectedTitleIndex(null); // Clear selection when typing custom title
              }}
              className={cn(
                selectedTitleIndex !== null && "opacity-50"
              )}
              disabled={selectedTitleIndex !== null}
            />
            {selectedTitleIndex !== null && (
              <Button
                type="button"
                variant="link"
                size="sm"
                className="mt-1 h-auto p-0"
                onClick={() => {
                  setSelectedTitleIndex(null);
                  setTitle("");
                }}
              >
                Switch to custom title
              </Button>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Submit Reflection
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
