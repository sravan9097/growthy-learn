
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface StepContentProps {
  step: string;
  content: Record<string, string>;
  onChange: (id: string, value: string) => void;
  onConfirm: () => void;
  onPreview: () => void;
  onUseGenerated?: (content: string) => void;
  generatedContent?: string;
}

export function StepContent({
  step,
  content,
  onChange,
  onConfirm,
  onPreview,
  onUseGenerated,
  generatedContent
}: StepContentProps) {
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
        return "Growthy uses your 'How it Works' content and use-cases to generate a draft. Refine it with your feedback.";
      case "title":
        return "Growthy uses your 'How it Works' content and use-cases to generate a draft. Refine it with your feedback.";
      default:
        return "";
    }
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
                onChange={(e) => onChange("til", e.target.value)}
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
                onChange={(e) => onChange("keyTakeaway", e.target.value)}
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
            {generatedContent && (
              <div className="mb-4">
                <Textarea
                  value={generatedContent}
                  readOnly
                  className="min-h-[200px] bg-muted/20"
                />
                <Button 
                  variant="secondary" 
                  className="mt-2"
                  onClick={() => onUseGenerated && onUseGenerated(generatedContent)}
                >
                  Use this
                </Button>
              </div>
            )}
            <div>
              <label htmlFor={step} className="block text-base font-medium mb-2">
                Review the above content and give feedback to Growthy to improve it.
              </label>
              <Textarea
                id={step}
                value={content[step] || ""}
                onChange={(e) => onChange(step, e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        );
      case "title":
        return (
          <div className="space-y-6">
            {generatedContent && (
              <div className="mb-4">
                <Input
                  value={generatedContent}
                  readOnly
                  className="bg-muted/20"
                />
                <Button 
                  variant="secondary" 
                  className="mt-2"
                  onClick={() => onUseGenerated && onUseGenerated(generatedContent)}
                >
                  Use this
                </Button>
              </div>
            )}
            <div>
              <label htmlFor="title" className="block text-base font-medium mb-2">
                Review the above content and give feedback to Growthy to improve it.
              </label>
              <Input
                id="title"
                value={content.title || ""}
                onChange={(e) => onChange("title", e.target.value)}
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
      
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="default" onClick={onPreview}>
          Preview
        </Button>
        <Button variant="default" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
