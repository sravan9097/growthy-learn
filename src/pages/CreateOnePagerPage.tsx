
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { StepContentNew } from "@/components/onepager/StepContentNew";
import { OnePagerPreview } from "@/components/onepager/OnePagerPreview";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronUp, ChevronDown, Check, RefreshCw, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function CreateOnePagerPage() {
  const navigate = useNavigate();
  const { toast: oldToast } = useToast();
  const [activeStep, setActiveStep] = useState("inputs");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    "inputs": true,
  });
  const [content, setContent] = useState<Record<string, string>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStepSaved, setCurrentStepSaved] = useState(false);
  const [showPreviewOnLeft, setShowPreviewOnLeft] = useState(false);

  // Define step ordering for navigation
  const steps = [
    { id: "inputs", title: "Supporting Artifacts", subtitle: null },
    { id: "how-it-works", title: "How it Works?", subtitle: null },
    { id: "use-cases", title: "Use-Cases", subtitle: null },
    { id: "problem-statement", title: "Problem Statement", subtitle: null },
    { id: "conclusion", title: "Conclusion", subtitle: null },
    { id: "title", title: "Title", subtitle: null },
  ];

  const sampleKeyTakeaway = "The 'manifest.json' file is the core configuration of a Chrome extension, defining its name, version, permissions, scripts, and behavior. It specifies required permissions like \"storage\", \"tabs\", or \"scripting\" and controls how the extension interacts with web pages using \"host_permission";
  
  useEffect(() => {
    // Set initial key takeaway
    if (!content.keyTakeaway) {
      setContent(prev => ({ ...prev, keyTakeaway: sampleKeyTakeaway }));
    }
  }, []);

  // Reset currentStepSaved when changing active step
  useEffect(() => {
    setCurrentStepSaved(completedSteps.includes(activeStep));
  }, [activeStep, completedSteps]);

  // Placeholder for generated content based on user inputs
  const getGeneratedContent = (step: string) => {
    if (step === "how-it-works") {
      return "The manifest.json file is the backbone of any Chrome extension. It defines the extension's metadata, required permissions, and how it behaves in the browser.\n\nFor tools like Awesome Screenshot & Screen Recorder, it enables interaction with all web pages using the host_permissions field (<all_urls>), which grants access across websites. Core permissions like tabs, activeTab, scripting, and desktopCapture allow capturing, recording, and modifying page content.\n\nThe content_scripts section automatically injects scripts to enable DOM interactions like highlighting.\n\nThe background service worker handles tasks like listening for capture events, while web_accessible_resources makes internal files accessible within page contexts. This configuration ensures smooth integration and functionality across any site, maintaining both flexibility and control.";
    }
    if (step === "use-cases") {
      return "1. Screen capturing tools use host_permissions to access and record content from any open tab or website.\n2. Content enhancement extensions inject scripts into web pages to add features like annotations or translations, based on permissions set in manifest.json.";
    }
    if (step === "problem-statement") {
      return "Chrome extensions often need deep interaction with web pages, but misconfigured or overly broad permissions can lead to security risks or limited functionality. Understanding how manifest.json controls these interactions is crucial, especially for extensions like screen capture or content augmentation tools that operate across many sites.";
    }
    if (step === "conclusion") {
      return "A well-structured manifest.json ensures secure and effective page interaction. Developers should use specific permissions where possible and follow Chrome's latest extension guidelines to maintain user trust and platform compliance.";
    }
    if (step === "title") {
      return "Understanding Chrome Extension Manifest: Permissions, Scripts, and Web Interactions";
    }
    return "";
  };

  const handleStepToggle = (stepId: string) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handleStepChange = (step: string) => {
    setActiveStep(step);
  };

  const handleContentChange = (id: string, value: string) => {
    setContent(prev => ({ ...prev, [id]: value }));
    // Reset current step saved status when content changes
    setCurrentStepSaved(false);
  };

  const handleConfirm = () => {
    // Remove the validation check for the first step to allow proceeding
    if (activeStep !== "inputs" && !currentStepSaved) {
      toast("Please save your progress before continuing", {
        description: "Click the Save button to save your changes",
      });
      return;
    }
    
    // Find the next step in sequence
    const currentIndex = steps.findIndex(step => step.id === activeStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1].id;
      setActiveStep(nextStep);
      setExpandedSteps(prev => ({
        ...prev,
        [nextStep]: true
      }));
    } else {
      // If all steps are completed, show preview
      setIsPreviewOpen(true);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handlePublish = () => {
    oldToast({
      title: "One-Pager Published!",
      description: "Your one-pager has been successfully published.",
    });
    navigate("/");
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      
      // Add current step to completed steps
      if (!completedSteps.includes(activeStep)) {
        setCompletedSteps(prev => [...prev, activeStep]);
      }
      
      // Set current step as saved
      setCurrentStepSaved(true);
      
      // Show left preview after saving first step
      if (activeStep === "inputs") {
        setShowPreviewOnLeft(true);
      }
      
      toast.success("Draft Saved", {
        description: "Your one-pager progress has been saved.",
      });
    }, 1000);
  };

  const handleUseGenerated = (generatedContent: string) => {
    handleContentChange(activeStep, generatedContent);
  };

  const renderStepItem = (step: { id: string, title: string, subtitle: string | null }, index: number) => {
    const isCompleted = completedSteps.includes(step.id);
    const isActive = activeStep === step.id;
    const isExpanded = expandedSteps[step.id];
    
    return (
      <div key={step.id} className="relative">
        {/* Timeline connector */}
        {index < steps.length - 1 && (
          <div className={cn(
            "absolute top-8 bottom-0 left-[17px] border-l-2",
            isCompleted ? "border-green-500" : "border-gray-200"
          )} />
        )}
        
        {/* Step item */}
        <div className="pl-10 relative mb-6">
          {/* Timeline dot */}
          <div className={cn(
            "absolute left-[9px] top-1.5 w-4 h-4 rounded-full",
            isCompleted 
              ? "bg-green-500 border-2 border-green-500" 
              : isActive 
                ? "bg-white border-2 border-green-500" 
                : "bg-white border-2 border-gray-300"
          )}>
            {isCompleted && (
              <Check className="h-3 w-3 text-white absolute -left-[1px] -top-[1px]" />
            )}
          </div>
          
          {/* Step content */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleStepToggle(step.id)}
            >
              <h3 className={cn(
                "text-lg mb-1",
                isActive || isCompleted ? "font-medium" : "font-normal text-muted-foreground"
              )}>
                {step.title}
                {isCompleted && <span className="ml-2 text-green-500">✓</span>}
              </h3>
              <button className="text-muted-foreground hover:text-primary">
                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            
            {/* Step preview when collapsed */}
            {!isExpanded && content[step.id] && (
              <div className="text-sm text-muted-foreground line-clamp-1">
                {content[step.id]}
              </div>
            )}
            
            {/* Expanded step content */}
            {isExpanded && (
              <div className="mt-2">
                {showPreviewOnLeft ? (
                  <div 
                    className={cn(
                      "bg-gray-50 rounded p-3 text-sm cursor-pointer",
                      isActive && "border-green-500 border-2"
                    )}
                    onClick={() => !isCompleted && handleStepChange(step.id)}
                  >
                    {content[step.id] ? (
                      <div className="line-clamp-3">{content[step.id]}</div>
                    ) : (
                      <div className="text-muted-foreground italic">No content yet. Click to add.</div>
                    )}
                  </div>
                ) : (
                  activeStep === "inputs" && step.id === "inputs" && (
                    <div 
                      className="bg-gray-50 rounded p-3 text-sm cursor-pointer"
                      onClick={() => handleStepChange(step.id)}
                    >
                      <div className="text-muted-foreground italic">Attach supporting artifacts</div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getCurrentStepTitle = () => {
    switch (activeStep) {
      case "inputs":
        return "Attach Supporting Artifacts";
      case "how-it-works":
        return "Compose 'How it Works?'";
      case "use-cases":
        return "Compose 'Use-Cases'";
      case "problem-statement":
        return "Compose 'Problem Statement'";
      case "conclusion":
        return "Compose 'Conclusion'";
      case "title":
        return "Compose 'Title'";
      default:
        return "";
    }
  };

  const getCurrentStepDescription = () => {
    switch (activeStep) {
      case "inputs":
        return "Add code, diagrams, or data to bring clarity and depth to your one-pager as per the Mentor suggestion";
      case "how-it-works":
      case "use-cases":
      case "problem-statement":
      case "conclusion":
        return "Growthy creates a first draft using your key takeaway and the visual. Refine it with your feedback.";
      case "title":
        return "Create a compelling title for your one-pager";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-4 flex items-center">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Go Back</span>
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span>One Pager</span>
        </div>
        
        <h1 className="text-2xl font-semibold mb-6">Create One-Pager</h1>
        
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-medium mb-3">Key Takeaways</h2>
          <p className="text-sm">{content.keyTakeaway || sampleKeyTakeaway}</p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Step-by-Step Flow</h2>
          <Button 
            variant="default" 
            onClick={handlePreview} 
            className="bg-green-600 hover:bg-green-700">
            Preview One-Pager
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side: Step navigation and preview */}
          <div className="border rounded-lg p-6 bg-white">
            {/* Show step navigation */}
            {steps.map((step, index) => renderStepItem(step, index))}
            
            {/* Show preview only after first step is saved */}
            {showPreviewOnLeft && activeStep !== "inputs" && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Preview</h3>
                <div className="space-y-4">
                  {steps.slice(1).map(step => {
                    if (!content[step.id]) return null;
                    return (
                      <div key={`preview-${step.id}`} className="mb-4">
                        <h4 className="text-base font-medium mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {content[step.id]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          {/* Right side: Active step editor */}
          <div className="border rounded-lg p-6 bg-white">
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-medium mb-2">
                {getCurrentStepTitle()}
              </h2>
              <p className="text-muted-foreground mb-4">
                {getCurrentStepDescription()}
              </p>
              
              <StepContentNew
                step={activeStep}
                content={content}
                onChange={handleContentChange}
                onUseGenerated={handleUseGenerated}
                generatedContent={getGeneratedContent(activeStep)}
                keyTakeaway={content.keyTakeaway || sampleKeyTakeaway}
              />
              
              {/* Save and Next buttons */}
              <div className="mt-auto">
                <div className="flex justify-end mt-6">
                  <Button 
                    variant="outline"
                    onClick={handleSave}
                    disabled={isSaving || !content[activeStep] || currentStepSaved}
                    className="mr-2"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="default" 
                    onClick={handleConfirm}
                    // Enable Next button for the first step (inputs)
                    disabled={activeStep !== "inputs" && !currentStepSaved}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {activeStep === steps[steps.length - 1].id ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <OnePagerPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onPublish={handlePublish}
        onSaveDraft={handleSave}
        content={content}
      />
    </Layout>
  );
}
