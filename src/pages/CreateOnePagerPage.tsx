
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { StepContentNew } from "@/components/onepager/StepContentNew";
import { OnePagerPreview } from "@/components/onepager/OnePagerPreview";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronUp, ChevronDown, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function CreateOnePagerPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState("inputs");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    "inputs": true,
  });
  const [content, setContent] = useState<Record<string, string>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
  };

  const handleConfirm = () => {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps(prev => [...prev, activeStep]);
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
    toast({
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
      toast({
        title: "Draft Saved",
        description: "Your one-pager draft has been saved.",
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
                {isActive ? (
                  <StepContentNew
                    step={step.id}
                    content={content}
                    onChange={handleContentChange}
                    onUseGenerated={handleUseGenerated}
                    generatedContent={getGeneratedContent(step.id)}
                    keyTakeaway={content.keyTakeaway || sampleKeyTakeaway}
                  />
                ) : (
                  <div 
                    className="bg-gray-50 rounded p-3 text-sm cursor-pointer"
                    onClick={() => handleStepChange(step.id)}
                  >
                    {content[step.id] ? (
                      <div className="line-clamp-3">{content[step.id]}</div>
                    ) : (
                      <div className="text-muted-foreground italic">No content yet. Click to add.</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
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
          {/* Left side: Step navigation */}
          <div className="border rounded-lg p-6 bg-white">
            {steps.map((step, index) => renderStepItem(step, index))}
          </div>
          
          {/* Right side: Active step editor */}
          <div className="border rounded-lg p-6 bg-white">
            <div className="flex flex-col h-full">
              {steps.map(step => (
                <div key={step.id} className={activeStep === step.id ? "block" : "hidden"}>
                  <h2 className="text-xl font-medium mb-2">
                    {step.id === "inputs" ? "Attach Supporting Artifacts" : `Compose '${step.title}'`}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {step.id === "inputs" 
                      ? "Add code, diagrams, or data to bring clarity and depth to your one-pager as per the Mentor suggestion" 
                      : "Growthy creates a first draft using your key takeaway and the visual. Refine it with your feedback."}
                  </p>
                  
                  {activeStep === "inputs" && (
                    <>
                      <div className="mt-4">
                        <h3 className="text-base font-medium mb-2">Suggested Artifacts by Mentor</h3>
                        <div className="p-4 bg-gray-50 border rounded-md text-sm mb-4">
                          Take a use case of Awesome screenshot. Come up with an example manifest file for the extension to work -&gt; with all the important keys needed and how they affect the interaction with the web page. Convert this into an image which describes each field in the manifest file. &lt;Anatomy of Manifest file&gt;
                        </div>
                        
                        <h3 className="text-base font-medium mb-2">Supporting Artifacts</h3>
                        <div className="flex gap-4 mb-4">
                          <Button variant="outline" className="font-normal">Attach Supporting Artifacts</Button>
                          <Button variant="outline" className="font-normal">Add Code Snipet</Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              <div className="mt-auto">
                {activeStep !== "inputs" && (
                  <div className="flex justify-end mt-8">
                    <Button 
                      variant="default" 
                      onClick={handleConfirm}
                      disabled={!content[activeStep]}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {activeStep === steps[steps.length - 1].id ? "Finish" : "Next"}
                    </Button>
                  </div>
                )}
                
                <div className="flex justify-end mt-4">
                  <Button 
                    variant="outline"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="ml-auto"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : "Save"}
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
