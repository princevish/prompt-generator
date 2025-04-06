import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Save, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Settings {
  apiKey: string;
  saveHistory: boolean;
  darkMode: boolean;
  maxHistoryItems: number;
  model: "gemini" | "llama3";
  llama3ApiKey?: string;
}

const defaultSettings: Settings = {
  apiKey: "",
  saveHistory: true,
  darkMode: false,
  maxHistoryItems: 50,
  model: "gemini",
  llama3ApiKey: "",
};

const Settings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [apiKeyRequired, setApiKeyRequired] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load settings from local storage
    const storedSettings = localStorage.getItem("appSettings");
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
        
        // Check if the required API key for the selected model is missing
        if (parsedSettings.model === "gemini") {
          setApiKeyRequired(!parsedSettings.apiKey);
        } else if (parsedSettings.model === "llama3") {
          setApiKeyRequired(!parsedSettings.llama3ApiKey);
        }
      } catch (error) {
        console.error("Error parsing settings:", error);
        setApiKeyRequired(true);
      }
    } else {
      setApiKeyRequired(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "number") {
      setSettings({
        ...settings,
        [name]: parseInt(value, 10),
      });
    } else {
      setSettings({
        ...settings,
        [name]: value,
      });
      
      // Update API key requirement based on model selection
      if (name === "apiKey" && settings.model === "gemini") {
        setApiKeyRequired(!value);
      } else if (name === "llama3ApiKey" && settings.model === "llama3") {
        setApiKeyRequired(!value);
      }
    }
  };

  const handleSwitchChange = (name: keyof Settings) => (checked: boolean) => {
    setSettings({
      ...settings,
      [name]: checked,
    });
  };

  const handleModelChange = (value: "gemini" | "llama3") => {
    setSettings({
      ...settings,
      model: value,
    });
    
    // Update API key requirement based on model selection
    if (value === "gemini") {
      setApiKeyRequired(!settings.apiKey);
    } else if (value === "llama3") {
      setApiKeyRequired(!settings.llama3ApiKey);
    }
  };

  const handleSave = () => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
    
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
    
    // Apply dark mode if needed
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Configure your app preferences
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-medium">AI Model Configuration</h2>
              
              <RadioGroup 
                value={settings.model} 
                onValueChange={(value) => handleModelChange(value as "gemini" | "llama3")}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gemini" id="gemini" />
                  <Label htmlFor="gemini">Google Gemini</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="llama3" id="llama3" />
                  <Label htmlFor="llama3">Meta Llama 3</Label>
                </div>
              </RadioGroup>
              
              {apiKeyRequired && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Required</AlertTitle>
                  <AlertDescription>
                    An API key is required for the selected model to use this app. Without it, you won't be able to generate prompts from images.
                  </AlertDescription>
                </Alert>
              )}
              
              {settings.model === "gemini" && (
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Gemini API Key</Label>
                  <Input
                    id="apiKey"
                    name="apiKey"
                    type="password"
                    value={settings.apiKey}
                    onChange={handleChange}
                    placeholder="Enter your Gemini API key"
                    className={settings.model === "gemini" && apiKeyRequired ? "border-destructive" : ""}
                  />
                  <p className="text-sm text-muted-foreground">
                    Get your API key from the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google AI Studio</a>
                  </p>
                </div>
              )}
              
              {settings.model === "llama3" && (
                <div className="space-y-2">
                  <Label htmlFor="llama3ApiKey">Llama 3 API Key</Label>
                  <Input
                    id="llama3ApiKey"
                    name="llama3ApiKey"
                    type="password"
                    value={settings.llama3ApiKey || ""}
                    onChange={handleChange}
                    placeholder="Enter your Llama 3 API key"
                    className={settings.model === "llama3" && apiKeyRequired ? "border-destructive" : ""}
                  />
                  <p className="text-sm text-muted-foreground">
                    Get your API key from the <a href="https://ai.meta.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Meta AI Platform</a>
                  </p>
                </div>
              )}
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-medium">App Preferences</h2>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable dark theme for the application
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={handleSwitchChange("darkMode")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="saveHistory">Save History</Label>
                  <p className="text-sm text-muted-foreground">
                    Save generated prompts to history
                  </p>
                </div>
                <Switch
                  id="saveHistory"
                  checked={settings.saveHistory}
                  onCheckedChange={handleSwitchChange("saveHistory")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxHistoryItems">Maximum History Items</Label>
                <Input
                  id="maxHistoryItems"
                  name="maxHistoryItems"
                  type="number"
                  min="1"
                  max="100"
                  value={settings.maxHistoryItems}
                  onChange={handleChange}
                />
                <p className="text-sm text-muted-foreground">
                  Maximum number of items to keep in history
                </p>
              </div>
            </div>
          </div>
          
          <Button onClick={handleSave} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;