import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptDisplayProps {
  prompt: string;
  onSave?: (editedPrompt: string) => void;
  className?: string;
}

export function PromptDisplay({ prompt, onSave, className }: PromptDisplayProps) {
  const [editedPrompt, setEditedPrompt] = useState(prompt);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(editedPrompt);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? "The prompt has been removed from your favorites" 
        : "The prompt has been added to your favorites",
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedPrompt);
      toast({
        title: "Prompt saved",
        description: "Your edited prompt has been saved",
      });
    }
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Generated Prompt</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleFavorite}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star
                className={`h-4 w-4 ${
                  isFavorite ? "fill-yellow-400 text-yellow-400" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        <Textarea
          value={editedPrompt}
          onChange={(e) => setEditedPrompt(e.target.value)}
          className="min-h-[200px] text-sm"
          placeholder="The generated prompt will appear here..."
        />

        {onSave && (
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}