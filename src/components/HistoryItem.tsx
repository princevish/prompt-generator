import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export interface HistoryItemData {
  id: string;
  imageUrl: string;
  prompt: string;
  timestamp: Date;
  isFavorite?: boolean;
  model?: "gemini" | "llama3";
}

interface HistoryItemProps {
  item: HistoryItemData;
  onDelete: (id: string) => void;
}

export function HistoryItem({ item, onDelete }: HistoryItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(item.prompt);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const formattedDate = format(item.timestamp, "MMM d, yyyy 'at' h:mm a");

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="h-16 w-16 rounded overflow-hidden mr-4 flex-shrink-0">
            <img
              src={item.imageUrl}
              alt="History item"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
              {item.model && (
                <Badge variant="outline" className="text-xs">
                  {item.model === "gemini" ? "Gemini" : "Llama 3"}
                </Badge>
              )}
            </div>
            <p className="text-sm truncate">
              {expanded ? item.prompt : `${item.prompt.substring(0, 60)}${item.prompt.length > 60 ? '...' : ''}`}
            </p>
          </div>
          <div className="flex flex-shrink-0 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleExpand}
              className="h-8 w-8"
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        {expanded && (
          <div className="px-4 pb-4 pt-0 border-t">
            <p className="text-sm mb-4">{item.prompt}</p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-8"
              >
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="h-8"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}