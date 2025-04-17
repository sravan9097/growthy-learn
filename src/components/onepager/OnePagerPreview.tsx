
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface OnePagerPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: () => void;
  onSaveDraft: () => void;
  onPreview?: () => void; // Added this missing prop
  content: Record<string, string>;
}

export function OnePagerPreview({
  isOpen,
  onClose,
  onPublish,
  onSaveDraft,
  onPreview,
  content,
}: OnePagerPreviewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Preview One-Pager</DialogTitle>
          <DialogDescription>
            Review your one-pager before publishing or saving as a draft.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 max-h-[60vh] mt-4">
          <div className="space-y-6">
            {content.title && (
              <div>
                <h2 className="text-2xl font-bold">{content.title}</h2>
              </div>
            )}

            {content.summary && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Summary</h3>
                <p className="whitespace-pre-line">{content.summary}</p>
              </div>
            )}

            {content.problem && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Problem</h3>
                <p className="whitespace-pre-line">{content.problem}</p>
              </div>
            )}

            {content.solution && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Solution</h3>
                <p className="whitespace-pre-line">{content.solution}</p>
              </div>
            )}

            {content.useCase && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Use Cases</h3>
                <p className="whitespace-pre-line">{content.useCase}</p>
              </div>
            )}

            {content.alternatives && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Alternatives Considered</h3>
                <p className="whitespace-pre-line">{content.alternatives}</p>
              </div>
            )}

            {content.references && (
              <div>
                <h3 className="text-lg font-semibold mb-2">References</h3>
                <p className="whitespace-pre-line">{content.references}</p>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onSaveDraft}>
            Save as Draft
          </Button>
          <Button onClick={onPublish}>Publish</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
