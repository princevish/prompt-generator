import { useEffect, useState } from "react";
import { PhotoCard } from "@/components/PhotoCard";
import { Schema } from "@/lib/db-types";

type Photo = Schema["photos"] & { id: number };

interface PhotoGridProps {
  photos: Photo[];
  albumId?: number;
  tagId?: number;
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  const [columns, setColumns] = useState(getColumnCount());

  function getColumnCount() {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  }

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create column arrays
  const photoColumns: Photo[][] = Array.from({ length: columns }, () => []);
  
  // Distribute photos into columns
  photos.forEach((photo, index) => {
    const columnIndex = index % columns;
    photoColumns[columnIndex].push(photo);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {photoColumns.map((columnPhotos, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {columnPhotos.map((photo) => {
            // Generate a random aspect ratio between 0.5 and 1.5
            const aspectRatio = Math.random() * 1 + 0.5;
            
            return (
              <PhotoCard
                key={photo.id}
                id={photo.id}
                title={photo.title}
                imageUrl={photo.imageUrl}
                aspectRatio={aspectRatio}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}