import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Schema } from "@/lib/db-types";

interface PhotoCardProps {
  photo: Schema["photos"];
  aspectRatio?: "portrait" | "square" | "video";
  width?: number;
  height?: number;
}

export function PhotoCard({
  photo,
  aspectRatio = "square",
  width,
  height,
}: PhotoCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link to={`/photo/${photo.id}`}>
      <Card className="overflow-hidden bg-transparent border-0 rounded-lg transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-0">
          <div
            className={cn(
              "overflow-hidden rounded-lg",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              width={width}
              height={height}
              className={cn(
                "h-full w-full object-cover transition-all duration-300 hover:scale-105",
                isLoading ? "blur-sm" : "blur-0"
              )}
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm truncate">{photo.title}</h3>
            <p className="text-xs text-muted-foreground">{photo.category}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}