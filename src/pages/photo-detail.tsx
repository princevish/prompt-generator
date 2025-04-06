import { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PhotoDetail } from "@/components/PhotoDetail";
import { getPhotoById, getPhotoTags, getAlbumById } from "@/lib/data-utils";
import { Schema } from "@/lib/db-types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Photo = Schema["photos"] & { id: number };
type Album = Schema["albums"] & { id: number };
type Tag = Schema["tags"] & { id: number };

const PhotoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const photoId = parseInt(id);
        const photoData = await getPhotoById(photoId);
        
        if (!photoData) {
          setError("Photo not found");
          return;
        }
        
        setPhoto(photoData);
        
        // Fetch tags for this photo
        const tagsData = await getPhotoTags(photoId);
        setTags(tagsData);
        
        // Fetch album if photo belongs to one
        if (photoData.albumId) {
          const albumData = await getAlbumById(photoData.albumId);
          setAlbum(albumData);
        }
      } catch (error) {
        console.error("Error fetching photo details:", error);
        setError("Failed to load photo details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPhotoDetails();
  }, [id]);

  if (error) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-grow w-full pt-24 pb-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : photo ? (
          <div className="container px-4 mx-auto">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Gallery
              </Link>
            </Button>
            
            <PhotoDetail 
              photo={photo} 
              tags={tags} 
              albumTitle={album?.title} 
              albumId={album?.id}
            />
          </div>
        ) : (
          <div className="container px-4 mx-auto py-20 text-center">
            <h1 className="text-2xl font-bold">Photo not found</h1>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PhotoDetailPage;