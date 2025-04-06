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

interface Settings {
  apiKey: string;
  saveHistory: boolean;
  darkMode: boolean;
  maxHistoryItems: number;
}

const defaultSettings: Settings = {
  apiKey: "",
  saveHistory: true,
  darkMode: false,
  maxHistoryItems: 50,
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
        setApiKeyRequired(!parsedSettings.apiKey);
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
      
      if (name === "apiKey") {
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
              <h2 className="text-xl font-medium">API Configuration</h2>
              
              {apiKeyRequired && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Required</AlertTitle>
                  <AlertDescription>
                    A Gemini API key is required to use this app. Without it, you won't be able to generate prompts from images.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="apiKey">Gemini API Key</Label>
                <Input
                  id="apiKey"
                  name="apiKey"
                  type="password"
                  value={settings.apiKey}
                  onChange={handleChange}
                  placeholder="Enter your Gemini API key"
                  className={apiKeyRequired ? "border-destructive" : ""}
                />
                <p className="text-sm text-muted-foreground">
                  Get your API key from the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google AI Studio</a>
                </p>
              </div>
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