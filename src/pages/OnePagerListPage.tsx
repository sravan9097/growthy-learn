
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function OnePagerListPage() {
  const [activeTab, setActiveTab] = useState("drafts");

  const draftOnePagers = [
    {
      id: "1",
      title: "UntitledOnePager",
      mentor: "Goutham Pilla",
      status: "draft",
      date: "",
    }
  ];

  const publishedOnePagers = [
    {
      id: "2",
      title: "Optimizing Web Performance with Browser Caching: Memory vs. Disk",
      mentor: "Goutham Pilla",
      status: "published",
      date: "03/06/20, 15:00",
    }
  ];

  const renderOnePagerItem = (onePager: any) => {
    return (
      <div key={onePager.id} className="flex items-center justify-between p-4 border rounded-lg mb-4">
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
          <div>
            <h3 className="font-medium">{onePager.title}</h3>
            <div className="text-sm text-muted-foreground mt-1">
              Mentor: {onePager.mentor} {onePager.date && `• published on ${onePager.date}`}
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          {activeTab === "drafts" ? (
            <>
              <div className="mr-2 px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">In Draft</div>
              <Link to={`/one-pager/${onePager.id}/edit`}>
                <Button variant="outline" size="icon" className="mr-2">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
            </>
          ) : (
            <div className="mr-2 px-2 py-1 text-xs bg-green-50 text-green-700 rounded">Published</div>
          )}
          
          <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  const renderSelectedTil = () => {
    return (
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-6">Title of selected TIL goes here or Body if title is missing...</h2>
        
        <div>
          <div className="text-sm text-muted-foreground mb-1">One-pager Selected by: Goutham Pilla</div>
          
          <h3 className="font-medium text-base mt-4 mb-2">Key Takeaways</h3>
          <div className="p-4 bg-gray-50 rounded-md text-sm">
            The 'manifest.json' file is the core configuration of a Chrome extension, defining its name, version, permissions, scripts, and behavior. It specifies required permissions like \"storage\", \"tabs\", or \"scripting\" and controls how the extension interacts with web pages using \"host_permission
          </div>
          
          <h3 className="font-medium text-base mt-4 mb-2">Suggested Artifacts by Mentor</h3>
          <div className="p-4 bg-gray-50 rounded-md text-sm">
            Take a use case of Awesome screenshot. Come up with an example manifest file for the extension to work -&gt; with all the important keys needed and how they affect the interaction with the web page. Convert this into an image which describes each field in the manifest file. &lt;Anatomy of Manifest file&gt;
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Link to="/create-one-pager">
            <Button className="bg-green-600 hover:bg-green-700">Start</Button>
          </Link>
        </div>
      </div>
    );
  };
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-4">One Pager</h1>
        
        <Tabs defaultValue="drafts" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 border-b bg-transparent w-full justify-start h-auto">
            <TabsTrigger 
              value="drafts" 
              className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-8 pb-2"
            >
              Drafts
            </TabsTrigger>
            <TabsTrigger 
              value="published" 
              className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-8 pb-2"
            >
              Published
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="drafts" className="mt-0">
            {renderSelectedTil()}
            {draftOnePagers.map(renderOnePagerItem)}
          </TabsContent>
          
          <TabsContent value="published" className="mt-0">
            {publishedOnePagers.map(renderOnePagerItem)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
