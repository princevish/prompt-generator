import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { PromptDisplay } from "@/components/PromptDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent } from "@/components/ui/card";

const Result = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [apiKeySet, setApiKeySet] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key is set in settings
    const storedSettings = localStorage.getItem("appSettings");
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        setApiKeySet(!!parsedSettings.apiKey);
      } catch (error) {
        console.error("Error parsing settings:", error);
        setApiKeySet(false);
      }
    } else {
      setApiKeySet(false);
    }

    // Get the generated prompt and image from session storage
    const storedPrompt = sessionStorage.getItem("generatedPrompt");
    const storedImage = sessionStorage.getItem("selectedImage");
    
    if (!storedPrompt || !storedImage) {
      // If no data is found, redirect to the home page
      navigate("/");
      return;
    }
    
    setPrompt(storedPrompt);
    setImageUrl(storedImage);
  }, [navigate]);

  const handleSaveToHistory = (editedPrompt: string) => {
    // Check if history is enabled in settings
    const storedSettings = localStorage.getItem("appSettings");
    let saveHistory = true;
    let maxItems = 50;
    
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        saveHistory = parsedSettings.saveHistory !== false;
        maxItems = parsedSettings.maxHistoryItems || 50;
      } catch (error) {
        console.error("Error parsing settings:", error);
      }
    }
    
    if (!saveHistory) {
      toast({
        title: "History disabled",
        description: "History saving is disabled in settings",
      });
      return;
    }
    
    // Get existing history from local storage or initialize empty array
    const existingHistory = JSON.parse(localStorage.getItem("promptHistory") || "[]");
    
    // Create new history item
    const newItem = {
      id: uuidv4(),
      imageUrl,
      prompt: editedPrompt,
      timestamp: new Date().toISOString(),
    };
    
    // Add to history and save back to local storage
    const updatedHistory = [newItem, ...existingHistory].slice(0, maxItems);
    localStorage.setItem("promptHistory", JSON.stringify(updatedHistory));
    
    toast({
      title: "Saved to history",
      description: "The prompt has been saved to your history",
    });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (!apiKeySet) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="flex items-center mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Generator
          </Button>
          
          <Card className="border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <h3 className="font-medium">API Key Required</h3>
                <p className="text-sm text-muted-foreground">
                  Please set your Gemini API key to use this app
                </p>
                <Button onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Go to Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="space-y-8">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Generator
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Generated Prompt</h1>
            <p className="text-muted-foreground">
              Edit the prompt if needed, then save it to your history
            </p>
          </div>
          
          {imageUrl && (
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={imageUrl}
                alt="Selected"
                className="w-full h-64 object-contain"
              />
            </div>
          )}
          
          <PromptDisplay 
            prompt={prompt} 
            onSave={handleSaveToHistory}
          />
          
          <Button 
            onClick={() => handleSaveToHistory(prompt)}
            className="w-full"
          >
            <Save className="mr-2 h-4 w-4" />
            Save to History
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Result;