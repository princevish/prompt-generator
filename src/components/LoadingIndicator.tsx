import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  text?: string;
  className?: string;
}

export function LoadingIndicator({ text = "Processing image...", className }: LoadingIndicatorProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground text-center">{text}</p>
    </div>
  );
}