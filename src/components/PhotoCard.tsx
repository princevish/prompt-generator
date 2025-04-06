import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PhotoCardProps {
  id: number;
  title: string;
  imageUrl: string;
  aspectRatio?: number;
  className?: string;
}

export function PhotoCard({ id, title, imageUrl, aspectRatio = 1, className }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link to={`/photo/${id}`}>
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-lg group",
          className
        )}
      >
        <CardContent className="p-0 relative">
          <div 
            className="w-full h-0 bg-muted/30" 
            style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
          >
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={title}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 w-full">
                <h3 className="text-white font-medium truncate">{title}</h3>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}