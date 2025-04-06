import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { fine } from "@/lib/fine";
import { Schema } from "@/lib/db-types";

type Album = Schema["albums"] & { id: number };
type Photo = Schema["photos"] & { id: number };

const AlbumsPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [coverPhotos, setCoverPhotos] = useState<Record<number, Photo | null>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      try {
        const albumsData = await fine.table("albums").select();
        setAlbums(albumsData || []);
        
        // Fetch cover photos for each album
        const coverPhotoMap: Record<number, Photo | null> = {};
        
        for (const album of albumsData) {
          if (album.coverImageId) {
            const photos = await fine.table("photos").select().eq("id", album.coverImageId);
            coverPhotoMap[album.id] = photos && photos.length > 0 ? photos[0] : null;
          } else {
            // If no cover image is set, try to get the first photo from the album
            const photos = await fine.table("photos").select().eq("albumId", album.id).limit(1);
            coverPhotoMap[album.id] = photos && photos.length > 0 ? photos[0] : null;
          }
        }
        
        setCoverPhotos(coverPhotoMap);
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlbums();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-grow w-full pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Albums</h1>
            <p className="text-muted-foreground text-lg">
              Browse my photography collections organized by theme
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : albums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <Link key={album.id} to={`/albums/${album.id}`}>
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group">
                    <CardContent className="p-0 relative">
                      <div className="aspect-[4/3] bg-muted/30">
                        {coverPhotos[album.id] ? (
                          <img
                            src={coverPhotos[album.id]?.imageUrl}
                            alt={album.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <p className="text-muted-foreground">No cover image</p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <div className="p-6 w-full">
                            <h2 className="text-white text-xl font-medium mb-1">{album.title}</h2>
                            {album.description && (
                              <p className="text-white/80 text-sm line-clamp-2">{album.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No albums found</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AlbumsPage;