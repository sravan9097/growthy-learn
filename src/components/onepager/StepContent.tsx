
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Check, RefreshCw, X, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepContentProps {
  step: string;
  nextStep?: string;
  content: Record<string, string>;
  onChange: (id: string, value: string) => void;
  onConfirm: () => void;
  onPreview: () => void;
  onSaveDraft?: () => void;
  onUseGenerated?: (content: string) => void;
  generatedContent?: string;
}

export function StepContent({
  step,
  nextStep,
  content,
  onChange,
  onConfirm,
  onPreview,
  onSaveDraft,
  onUseGenerated,
  generatedContent
}: StepContentProps) {
  const [showAIContent, setShowAIContent] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const getStepTitle = () => {
    switch (step) {
      case "inputs":
        return "Get Started with the Inputs";
      case "how-it-works":
        return "Compose 'How it Works?'";
      case "use-cases":
        return "Compose 'Use-Cases'";
      case "problem-statement":
        return "Compose Problem Statement";
      case "conclusion":
        return "Compose Conclusion";
      case "title":
        return "Compose Title";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "inputs":
        return "Make sure to select the TIL, key takeaway, and create a visual with partner approval before starting the one-pager.";
      case "how-it-works":
      case "use-cases":
      case "problem-statement":
      case "conclusion":
        return "Growthy uses your content to generate a draft. Review and refine it or create your own.";
      case "title":
        return "Create a compelling title for your one-pager that captures the essence of your content.";
      default:
        return "";
    }
  };

  const getNextButtonText = () => {
    if (nextStep) {
      return `Next: ${nextStep}`;
    }
    return "Confirm";
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setIsDirty(true);
    onChange(step, e.target.value);
    
    // Simulate autosave
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const handleAcceptAI = () => {
    if (generatedContent) {
      onUseGenerated && onUseGenerated(generatedContent);
      setShowAIContent(false);
      setIsDirty(true);
      
      // Simulate autosave
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setLastSaved(new Date());
      }, 1000);
    }
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    
    // Simulate regeneration delay
    setTimeout(() => {
      setIsRegenerating(false);
    }, 1500);
  };

  const handleDismissAI = () => {
    setShowAIContent(false);
  };

  // Function to format the last saved time
  const formatLastSaved = () => {
    if (!lastSaved) return null;
    
    const now = new Date();
    const diff = now.getTime() - lastSaved.getTime();
    
    if (diff < 60000) return "Saved just now";
    if (diff < 3600000) return `Saved ${Math.floor(diff / 60000)} min ago`;
    return `Saved ${Math.floor(diff / 3600000)} hours ago`;
  };

  const renderStepContent = () => {
    switch (step) {
      case "inputs":
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="til" className="block text-base font-medium mb-2">
                What is your TIL?
              </label>
              <Textarea
                id="til"
                value={content.til || ""}
                onChange={(e) => {
                  onChange("til", e.target.value);
                  setIsDirty(true);
                  
                  // Simulate autosave
                  setIsSaving(true);
                  setTimeout(() => {
                    setIsSaving(false);
                    setLastSaved(new Date());
                  }, 1000);
                }}
                className="min-h-[100px]"
              />
            </div>
            <div>
              <label htmlFor="key-takeaway" className="block text-base font-medium mb-2">
                What is the key-takeaway from the TIL for the one-pager?
              </label>
              <Textarea
                id="key-takeaway"
                value={content.keyTakeaway || ""}
                onChange={(e) => {
                  onChange("keyTakeaway", e.target.value);
                  setIsDirty(true);
                  
                  // Simulate autosave
                  setIsSaving(true);
                  setTimeout(() => {
                    setIsSaving(false);
                    setLastSaved(new Date());
                  }, 1000);
                }}
                className="min-h-[100px]"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <Button variant="secondary" className="flex-1">
                Attach Visuals
              </Button>
              <Button variant="secondary" className="flex-1">
                Add a Code Snippet
              </Button>
            </div>
          </div>
        );
      case "how-it-works":
      case "use-cases":
      case "problem-statement":
      case "conclusion":
        return (
          <div className="space-y-6">
            {generatedContent && showAIContent && (
              <Card className="p-4 bg-slate-50 border">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-muted-foreground">AI Suggested</div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-blue-600"
                      onClick={handleAcceptAI}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept & Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 px-2"
                      onClick={handleRegenerate}
                      disabled={isRegenerating}
                    >
                      <RefreshCw className={cn("h-4 w-4 mr-1", isRegenerating && "animate-spin")} />
                      {isRegenerating ? "Generating..." : "Regenerate"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 px-2 text-gray-500"
                      onClick={handleDismissAI}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-md border text-sm">
                  {generatedContent}
                </div>
              </Card>
            )}
            <div>
              <div className="flex justify-between">
                <label htmlFor={step} className="block text-base font-medium mb-2">
                  Your Content
                </label>
                {(isSaving || lastSaved) && (
                  <span className="text-xs text-muted-foreground">
                    {isSaving ? "Saving..." : formatLastSaved()}
                  </span>
                )}
              </div>
              <Textarea
                id={step}
                value={content[step] || ""}
                onChange={handleContentChange}
                placeholder="Write your content here..."
                className="min-h-[200px]"
              />
            </div>
            <div>
              <label htmlFor="feedback" className="block text-base font-medium mb-2">
                Help us improve this suggestion
              </label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What did you like or what could be improved?"
                className="min-h-[100px]"
              />
            </div>
          </div>
        );
      case "title":
        return (
          <div className="space-y-6">
            {generatedContent && showAIContent && (
              <Card className="p-4 bg-slate-50 border">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-muted-foreground">AI Suggested</div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-blue-600"
                      onClick={handleAcceptAI}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept & Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 px-2"
                      onClick={handleRegenerate}
                      disabled={isRegenerating}
                    >
                      <RefreshCw className={cn("h-4 w-4 mr-1", isRegenerating && "animate-spin")} />
                      {isRegenerating ? "Generating..." : "Regenerate"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 px-2 text-gray-500"
                      onClick={handleDismissAI}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-md border text-sm">
                  {generatedContent}
                </div>
              </Card>
            )}
            <div>
              <div className="flex justify-between">
                <label htmlFor="title" className="block text-base font-medium mb-2">
                  Your Title
                </label>
                {(isSaving || lastSaved) && (
                  <span className="text-xs text-muted-foreground">
                    {isSaving ? "Saving..." : formatLastSaved()}
                  </span>
                )}
              </div>
              <Input
                id="title"
                value={content.title || ""}
                onChange={handleContentChange}
                placeholder="Enter your title here..."
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium mb-2">{getStepTitle()}</h2>
      <p className="text-muted-foreground mb-6">{getStepDescription()}</p>
      
      {renderStepContent()}
      
      <div className="flex justify-between gap-4 mt-8">
        <Button 
          variant="outline" 
          onClick={onSaveDraft}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save as Draft
        </Button>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={onPreview}
          >
            Preview
          </Button>
          <Button 
            variant="default" 
            onClick={onConfirm}
            disabled={!isDirty && !content[step]}
          >
            {getNextButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
}
