import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PhotoGrid } from "@/components/PhotoGrid";
import { getAlbumById, getPhotosByAlbum } from "@/lib/data-utils";
import { Schema } from "@/lib/db-types";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Album = Schema["albums"] & { id: number };
type Photo = Schema["photos"] & { id: number };

const AlbumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const albumId = parseInt(id);
        const albumData = await getAlbumById(albumId);
        
        if (!albumData) {
          setError("Album not found");
          return;
        }
        
        setAlbum(albumData);
        
        // Fetch photos for this album
        const photosData = await getPhotosByAlbum(albumId);
        setPhotos(photosData || []);
      } catch (error) {
        console.error("Error fetching album details:", error);
        setError("Failed to load album details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlbumDetails();
  }, [id]);

  if (error) {
    return <Navigate to="/albums" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-grow w-full pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/albums" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Albums
            </Link>
          </Button>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : album ? (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{album.title}</h1>
                {album.description && (
                  <p className="text-muted-foreground text-lg">{album.description}</p>
                )}
              </div>
              
              {photos.length > 0 ? (
                <PhotoGrid photos={photos} albumId={album.id} />
              ) : (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">No photos in this album</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold">Album not found</h1>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AlbumDetailPage;