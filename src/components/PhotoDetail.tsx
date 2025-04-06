import { useState } from "react";
import { Share2, Download, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Schema } from "@/lib/db-types";
import { Link } from "react-router-dom";

interface PhotoDetailProps {
  photo: Schema["photos"] & { id: number };
  tags?: { id: number; name: string }[];
  albumTitle?: string;
  albumId?: number;
}

export function PhotoDetail({ photo, tags = [], albumTitle, albumId }: PhotoDetailProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const formattedDate = new Date(photo.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 relative bg-muted/30 rounded-lg overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className={`w-full h-auto rounded-lg ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{photo.title}</h1>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          {photo.description && (
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{photo.description}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-medium mb-2">Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Date</dt>
                <dd>{formattedDate}</dd>
              </div>
              
              {albumTitle && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Album</dt>
                  <dd>
                    <Link to={`/albums/${albumId}`} className="text-primary hover:underline">
                      {albumTitle}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          
          {tags.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}