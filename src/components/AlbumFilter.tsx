import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fine } from "@/lib/fine";
import { Schema } from "@/lib/db-types";

type Album = Schema["albums"] & { id: number };

export function AlbumFilter() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumsData = await fine.table("albums").select();
        setAlbums(albumsData || []);
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 p-1">
        <Button
          variant={isActive("/") ? "default" : "ghost"}
          size="sm"
          asChild
          className="rounded-full"
        >
          <Link to="/">All Photos</Link>
        </Button>
        
        {albums.map((album) => (
          <Button
            key={album.id}
            variant={isActive(`/albums/${album.id}`) ? "default" : "ghost"}
            size="sm"
            asChild
            className="rounded-full"
          >
            <Link to={`/albums/${album.id}`}>{album.title}</Link>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}