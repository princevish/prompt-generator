import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { HistoryItem, HistoryItemData } from "@/components/HistoryItem";
import { Button } from "@/components/ui/button";
import { Trash2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";

const History = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItemData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [apiKeySet, setApiKeySet] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

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

    loadHistory();
  }, []);

  const loadHistory = () => {
    const storedHistory = localStorage.getItem("promptHistory");
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        // Convert string timestamps to Date objects
        const formattedHistory = parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistoryItems(formattedHistory);
      } catch (error) {
        console.error("Error parsing history:", error);
        setHistoryItems([]);
      }
    }
  };

  const handleDeleteItem = (id: string) => {
    const updatedHistory = historyItems.filter(item => item.id !== id);
    setHistoryItems(updatedHistory);
    localStorage.setItem("promptHistory", JSON.stringify(updatedHistory));
    
    toast({
      title: "Item deleted",
      description: "The history item has been removed",
    });
  };

  const handleClearAll = () => {
    setHistoryItems([]);
    localStorage.removeItem("promptHistory");
    setIsDialogOpen(false);
    
    toast({
      title: "History cleared",
      description: "All history items have been removed",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Prompt History</h1>
            
            {historyItems.length > 0 && (
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear all history?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete all your saved prompts and images.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearAll}>
                      Yes, clear all
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          
          {!apiKeySet && (
            <Card className="border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 mb-4">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="font-medium">API Key Required</h3>
                    <p className="text-sm text-muted-foreground">
                      Please set your Gemini API key to use all features of this app
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
          
          {historyItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No history items yet. Generate some prompts to see them here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {historyItems.map((item) => (
                <HistoryItem
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;