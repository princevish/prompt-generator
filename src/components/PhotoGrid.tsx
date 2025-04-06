import { useState, useEffect } from "react";
import { PhotoCard } from "@/components/PhotoCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Schema } from "@/lib/db-types";

interface PhotoGridProps {
  photos: Schema["photos"][];
  category?: string;
  loading?: boolean;
}

export function PhotoGrid({ photos, category, loading = false }: PhotoGridProps) {
  const [filteredPhotos, setFilteredPhotos] = useState<Schema["photos"][]>([]);

  useEffect(() => {
    if (category && category !== "all") {
      setFilteredPhotos(photos.filter(photo => photo.category === category));
    } else {
      setFilteredPhotos(photos);
    }
  }, [photos, category]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredPhotos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No photos found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {filteredPhotos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}