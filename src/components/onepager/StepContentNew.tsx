
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Check, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepContentNewProps {
  step: string;
  content: Record<string, string>;
  onChange: (id: string, value: string) => void;
  onUseGenerated?: (content: string) => void;
  generatedContent?: string;
  keyTakeaway: string;
}

export function StepContentNew({
  step,
  content,
  onChange,
  onUseGenerated,
  generatedContent,
  keyTakeaway
}: StepContentNewProps) {
  const [showAIContent, setShowAIContent] = useState(Boolean(generatedContent));
  const [feedback, setFeedback] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    
    // Simulate regeneration delay
    setTimeout(() => {
      setIsRegenerating(false);
    }, 1500);
  };

  const handleAcceptAI = () => {
    if (generatedContent) {
      onUseGenerated && onUseGenerated(generatedContent);
      setIsApplied(true);
    }
  };

  const handleDismissAI = () => {
    setShowAIContent(false);
  };

  const renderInputsStep = () => {
    return (
      <div className="space-y-6">
        <div>
          {/* This would be replaced with an actual file upload component */}
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">Drag and drop files here or click to browse</p>
            <Button variant="outline" className="mx-auto">Upload Files</Button>
          </div>
        </div>
      </div>
    );
  };

  const renderCompositionStep = () => {
    return (
      <div className="space-y-6">
        {generatedContent && showAIContent && (
          <div>
            <div className="flex items-center mb-2 text-sm">
              <div className="text-muted-foreground flex items-center">
                <span className="bg-green-50 text-green-600 rounded-full p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0"/><path d="m12 8 4 4-4 4"/><path d="m8 12h8"/></svg>
                </span>
                <span>Growthy {isApplied ? "suggested based on the artifacts..." : "is suggesting content for you..."}</span>
              </div>
              
              {isApplied ? (
                <div className="ml-auto flex items-center text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  <span>Applied</span>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 px-2 ml-auto"
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                >
                  <RefreshCw className={cn("h-4 w-4 mr-1", isRegenerating && "animate-spin")} />
                  {isRegenerating ? "Generating..." : "Try again"}
                </Button>
              )}
            </div>
            <Textarea
              value={generatedContent}
              readOnly
              className="min-h-[200px] bg-white"
              onChange={() => {}}
            />
            
            {!isApplied && (
              <div className="flex justify-end mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 text-green-600 border-green-600 hover:bg-green-50"
                  onClick={handleAcceptAI}
                >
                  Use This
                </Button>
              </div>
            )}
          </div>
        )}
        
        <div>
          <label htmlFor={step} className="block text-base font-medium mb-2">
            Write how it works
          </label>
          <Textarea
            id={step}
            value={content[step] || ""}
            onChange={(e) => onChange(step, e.target.value)}
            placeholder="Write here..."
            className="min-h-[200px]"
          />
        </div>

        <div>
          <div className="flex items-center mb-2 text-sm">
            <div className="text-muted-foreground">Review the above content and give feedback to Growthy to improve it.</div>
          </div>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write here to change and ask growthy to improve it..."
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground mt-1">press ↵ enter to ask growthy</p>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case "inputs":
        return renderInputsStep();
      case "how-it-works":
      case "use-cases":
      case "problem-statement":
      case "conclusion":
      case "title":
        return renderCompositionStep();
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderStepContent()}
    </div>
  );
}
