
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { OnePagerSidebar } from "@/components/onepager/OnePagerSidebar";
import { StepContent } from "@/components/onepager/StepContent";
import { OnePagerPreview } from "@/components/onepager/OnePagerPreview";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CreateOnePagerPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState("inputs");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Placeholder for generated content based on user inputs
  const getGeneratedContent = (step: string) => {
    if (step === "how-it-works") {
      return "The manifest.json file is the backbone of any Chrome extension. It defines the extension's metadata, required permissions, and how it behaves in the browser.\n\nFor tools like Awesome Screenshot & Screen Recorder, it enables interaction with all web pages using the host_permissions field (<all_urls>), which grants access across websites. Core permissions like tabs, activeTab, scripting, and desktopCapture allow capturing, recording, and modifying page content.";
    }
    if (step === "use-cases") {
      return "1. Screen capturing tools use host_permissions to access and record content from any open tab or website.\n2. Content enhancement extensions inject scripts into web pages to add features like annotations or translations, based on permissions set in manifest.json.";
    }
    if (step === "problem-statement") {
      return "Chrome extensions often need deep interaction with web pages, but misconfigured or overly broad permissions can lead to security risks or limited functionality. Understanding how manifest.json controls these interactions is crucial, especially for extensions like screen capture or content augmentation tools that operate across many sites.";
    }
    if (step === "conclusion") {
      return "Chrome extensions often need deep interaction with web pages, but misconfigured or overly broad permissions can lead to security risks or limited functionality. Understanding how manifest.json controls these interactions is crucial, especially for extensions like screen capture or content augmentation tools that operate across many sites.";
    }
    if (step === "title") {
      return "Understanding Chrome Extension Manifest: Permissions, Scripts, and Web Interactions";
    }
    return "";
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
    
    // Find the next step that hasn't been completed
    const steps = ["inputs", "how-it-works", "use-cases", "problem-statement", "conclusion", "title"];
    const currentIndex = steps.indexOf(activeStep);
    
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1]);
    } else {
      // If all steps are completed, show preview
      setIsPreviewOpen(true);
    }
  };

  const handlePreview = () => {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps(prev => [...prev, activeStep]);
    }
    setIsPreviewOpen(true);
  };

  const handlePublish = () => {
    toast({
      title: "One-Pager Published!",
      description: "Your one-pager has been successfully published.",
    });
    navigate("/");
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your one-pager draft has been saved.",
    });
    navigate("/");
  };

  const handleUseGenerated = (generatedContent: string) => {
    handleContentChange(activeStep, generatedContent);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Create One-Pager</h1>
        </div>
        
        <div className="flex gap-8">
          <div className="w-1/3">
            <h2 className="text-lg font-medium mb-4">Step-by-Step Flow</h2>
            <OnePagerSidebar
              activeStep={activeStep}
              completedSteps={completedSteps}
              onStepChange={handleStepChange}
              content={content}
            />
          </div>
          
          <div className="w-2/3 border-l pl-8">
            <StepContent
              step={activeStep}
              content={content}
              onChange={handleContentChange}
              onConfirm={handleConfirm}
              onPreview={handlePreview}
              onUseGenerated={handleUseGenerated}
              generatedContent={getGeneratedContent(activeStep)}
            />
          </div>
        </div>
      </div>
      
      <OnePagerPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onPublish={handlePublish}
        onSaveDraft={handleSaveDraft}
        content={content}
      />
    </Layout>
  );
}
