
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface OnePagerPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: () => void;
  onSaveDraft: () => void;
  onPreview: () => void;
  content: Record<string, string>;
}

export function OnePagerPreview({
  isOpen,
  onClose,
  onPublish,
  onSaveDraft,
  content,
}: OnePagerPreviewProps) {
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publish One-Pager</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Read the below one-pager, review, make modifications and finally Publish
          </p>
          
          <div className="border rounded-lg p-6 overflow-y-auto max-h-[60vh]">
            <h1 className="text-2xl font-bold mb-4">{content.title || "Understanding Chrome Extension Manifest"}</h1>
            
            <div className="text-sm text-muted-foreground mb-6">
              {formatDate()}
              <span className="ml-2">5 min read</span>
            </div>
            
            <p className="mb-6">
              {content["problem-statement"] || 
                "Chrome extensions often need deep interaction with web pages, but misconfigured or overly broad permissions can lead to security risks or limited functionality. Understanding how manifest.json controls these interactions is crucial, especially for extensions like screen capture or content augmentation tools that operate across many sites."}
            </p>
            
            <div className="h-96 bg-muted rounded-md mb-6"></div>
            
            <h2 className="text-xl font-medium mb-3">How does it work?</h2>
            <p className="mb-4">
              {content["how-it-works"] || 
                "The manifest.json file is the backbone of any Chrome extension. It defines the extension's metadata, required permissions, and how it behaves in the browser."}
            </p>
            <p className="mb-6">
              {"For tools like Awesome Screenshot & Screen Recorder, it enables interaction with all web pages using the host_permissions field (<all_urls>), which grants access across websites. Core permissions like tabs, activeTab, scripting, and desktopCapture allow capturing, recording, and modifying page content. The content_scripts section automatically injects scripts to enable DOM interactions like highlighting. The background service worker handles tasks like listening for capture events, while web_accessible_resources makes internal files accessible within page contexts. This configuration ensures smooth integration and functionality across any site, maintaining both flexibility and control."}
            </p>
            
            <h2 className="text-xl font-medium mb-3">Use Cases</h2>
            <p className="mb-6">
              {content["use-cases"] || 
                "1. Screen capturing tools use host_permissions to access and record content from any open tab or website.\n2. Content enhancement extensions inject scripts into web pages to add features like annotations or translations, based on permissions set in manifest.json."}
            </p>
            
            <h2 className="text-xl font-medium mb-3">Conclusion</h2>
            <p className="mb-6">
              {content["conclusion"] || 
                "A well-structured manifest.json ensures secure and effective page interaction. Developers should use specific permissions where possible and follow Chrome's latest extension guidelines to maintain user trust and platform compliance."}
            </p>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onSaveDraft}>
              Save as Draft
            </Button>
            <Button onClick={onPublish}>
              Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
