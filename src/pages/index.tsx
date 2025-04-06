import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PhotoGrid } from "@/components/PhotoGrid";
import { AlbumFilter } from "@/components/AlbumFilter";
import { Schema } from "@/lib/db-types";
import { getPhotosByAlbum } from "@/lib/data-utils";
import { initializeDatabase } from "@/lib/data-utils";

type Photo = Schema["photos"] & { id: number };

const Index = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Initialize database with sample data if needed
        await initializeDatabase();
        
        // Fetch all photos
        const photosData = await getPhotosByAlbum();
        setPhotos(photosData || []);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-grow w-full pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-muted-foreground text-lg">
              Explore my collection of photographs from around the world
            </p>
          </div>
          
          <div className="mb-8">
            <AlbumFilter />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : photos.length > 0 ? (
            <PhotoGrid photos={photos} />
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No photos found</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;