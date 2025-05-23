import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { ImagePicker } from "@/components/ImagePicker";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Button } from "@/components/ui/button";
import { Wand2, Settings } from "lucide-react";
import { mockGeneratePromptFromImage as mockGeminiGenerate } from "@/lib/gemini";
import { mockGeneratePromptFromImage as mockLlamaGenerate } from "@/lib/llama";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKeySet, setApiKeySet] = useState(true); // Default to true for mock functionality
  const [selectedModel, setSelectedModel] = useState<"gemini" | "llama3">("gemini");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key is set in settings
    const storedSettings = localStorage.getItem("appSettings");
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        setSelectedModel(parsedSettings.model || "gemini");
        
        // Check if the required API key for the selected model is set
        if (parsedSettings.model === "gemini") {
          setApiKeySet(!!parsedSettings.apiKey);
        } else if (parsedSettings.model === "llama3") {
          setApiKeySet(!!parsedSettings.llama3ApiKey);
        } else {
          setApiKeySet(!!parsedSettings.apiKey); // Default to Gemini
        }
      } catch (error) {
        console.error("Error parsing settings:", error);
        setApiKeySet(false);
      }
    } else {
      setApiKeySet(false);
    }
  }, []);

  const handleImageSelected = (imageData: string) => {
    setSelectedImage(imageData);
  };

  const handleGeneratePrompt = async () => {
    if (!apiKeySet) {
      toast({
        title: "API Key Required",
        description: `Please set your ${selectedModel === "gemini" ? "Gemini" : "Llama 3"} API key in settings first`,
        variant: "destructive",
      });
      navigate("/settings");
      return;
    }

    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // In a real app, we would use the actual API
      // For this demo, we're using mock functions
      let response;
      
      if (selectedModel === "gemini") {
        response = await mockGeminiGenerate(selectedImage);
      } else {
        response = await mockLlamaGenerate(selectedImage);
      }
      
      if (response.error) {
        throw new Error(response.error);
      }

      // Store the result in session storage to pass to the result page
      sessionStorage.setItem("generatedPrompt", response.text);
      sessionStorage.setItem("selectedImage", selectedImage);
      sessionStorage.setItem("usedModel", selectedModel);
      
      // Navigate to the result page
      navigate("/result");
    } catch (error: any) {
      toast({
        title: "Error generating prompt",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Image Prompt Generator</h1>
            <p className="text-muted-foreground">
              Upload an image and get an AI-generated prompt to create similar images
            </p>
            <p className="text-sm text-primary mt-1">
              Using {selectedModel === "gemini" ? "Google Gemini" : "Meta Llama 3"} model
            </p>
          </div>
          
          {!apiKeySet && (
            <Card className="border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="font-medium">API Key Required</h3>
                    <p className="text-sm text-muted-foreground">
                      Please set your {selectedModel === "gemini" ? "Gemini" : "Llama 3"} API key to use this app
                    </p>
                  </div>
                  <Button onClick={() => navigate("/settings")} className="whitespace-nowrap">
                    <Settings className="mr-2 h-4 w-4" />
                    Go to Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <ImagePicker onImageSelected={handleImageSelected} />
          
          {isProcessing ? (
            <LoadingIndicator text={`Analyzing image with ${selectedModel === "gemini" ? "Google Gemini" : "Meta Llama 3"}...`} />
          ) : (
            <Button 
              onClick={handleGeneratePrompt} 
              disabled={!selectedImage}
              className="w-full"
              size="lg"
            >
              <Wand2 className="mr-2 h-5 w-5" />
              Generate Prompt
            </Button>
          )}
          
          <div className="text-center text-sm text-muted-foreground">
            <p>
              This tool uses AI to analyze your images and generate detailed prompts
              that can be used with text-to-image models to create similar images.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;