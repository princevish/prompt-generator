import { useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { Schema } from "@/lib/db-types";

interface PhotoDetailProps {
  photo: Schema["photos"];
}

export function PhotoDetail({ photo }: PhotoDetailProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  let formattedDate;
  try {
    formattedDate = format(new Date(photo.date), "MMMM d, yyyy");
  } catch (error) {
    formattedDate = photo.date;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/gallery" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Link>
        </Button>
      </div>
      
      <div className="relative">
        {isLoading && (
          <Skeleton className="w-full aspect-[16/9] md:aspect-[3/2] rounded-lg" />
        )}
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className={cn(
            "w-full rounded-lg object-cover",
            isLoading ? "hidden" : "block"
          )}
          style={{ maxHeight: "70vh" }}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{photo.title}</h1>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            {formattedDate}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Tag className="mr-1 h-4 w-4" />
            {photo.category}
          </div>
        </div>
        
        {photo.description && (
          <p className="text-muted-foreground">{photo.description}</p>
        )}
      </div>
    </div>
  );
}