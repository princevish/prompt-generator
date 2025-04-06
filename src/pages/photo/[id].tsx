import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PhotoDetail } from "@/components/PhotoDetail";
import { PhotoCard } from "@/components/PhotoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { fine } from "@/lib/fine";
import type { Schema } from "@/lib/db-types";

const PhotoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<Schema["photos"] | null>(null);
  const [relatedPhotos, setRelatedPhotos] = useState<Schema["photos"][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!id) {
        navigate("/gallery");
        return;
      }

      setLoading(true);
      
      try {
        const photoId = parseInt(id);
        const photoData = await fine.table("photos").select().eq("id", photoId);
        
        if (!photoData || photoData.length === 0) {
          // Check if we have sample data that matches
          const samplePhoto = samplePhotos.find(p => p.id === photoId);
          if (samplePhoto) {
            setPhoto(samplePhoto);
            
            // Get related photos from the same category
            const related = samplePhotos
              .filter(p => p.category === samplePhoto.category && p.id !== photoId)
              .slice(0, 3);
            setRelatedPhotos(related);
          } else {
            navigate("/gallery");
          }
        } else {
          setPhoto(photoData[0]);
          
          // Fetch related photos from the same category
          const related = await fine.table("photos")
            .select()
            .eq("category", photoData[0].category)
            .neq("id", photoId)
            .limit(3);
          
          setRelatedPhotos(related || []);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
        
        // Check if we have sample data that matches
        const photoId = parseInt(id);
        const samplePhoto = samplePhotos.find(p => p.id === photoId);
        if (samplePhoto) {
          setPhoto(samplePhoto);
          
          // Get related photos from the same category
          const related = samplePhotos
            .filter(p => p.category === samplePhoto.category && p.id !== photoId)
            .slice(0, 3);
          setRelatedPhotos(related);
        } else {
          navigate("/gallery");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="w-full aspect-[16/9] md:aspect-[3/2] rounded-lg" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!photo) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <PhotoDetail photo={photo} />
        
        {relatedPhotos.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-6">More from this category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedPhotos.map((relatedPhoto) => (
                <PhotoCard key={relatedPhoto.id} photo={relatedPhoto} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Sample data in case the database is empty
const samplePhotos: Schema["photos"][] = [
  {
    id: 1,
    title: "Mountain Sunrise",
    description: "Beautiful sunrise over mountain peaks. The golden light illuminates the landscape, creating a breathtaking scene that showcases the majesty of nature. This photograph was taken after hiking for two hours before dawn to reach the perfect vantage point.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    category: "Landscape",
    date: "2023-05-15",
    featured: true
  },
  {
    id: 2,
    title: "Urban Architecture",
    description: "Modern city buildings from below. This perspective emphasizes the grandeur and geometric patterns of contemporary architecture. Shot during the blue hour to capture the perfect balance between natural and artificial light.",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop",
    category: "Architecture",
    date: "2023-06-22",
    featured: true
  },
  {
    id: 3,
    title: "Portrait in Natural Light",
    description: "Portrait photography using natural window light. The soft, diffused light creates gentle shadows that highlight the subject's features while maintaining a natural and authentic feel. No artificial lighting was used in this shoot.",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop",
    category: "Portrait",
    date: "2023-07-10",
    featured: true
  },
  {
    id: 4,
    title: "Ocean Waves",
    description: "Dramatic ocean waves during sunset. The combination of the golden hour light and the dynamic movement of the water creates a mesmerizing scene. A slow shutter speed was used to capture the flowing motion of the waves.",
    imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2057&auto=format&fit=crop",
    category: "Seascape",
    date: "2023-08-05",
    featured: true
  },
  {
    id: 5,
    title: "Street Photography",
    description: "Candid moment on a busy street. This photograph captures the essence of urban life and the fleeting interactions that make city living so vibrant. Shot with a 35mm lens to maintain context while focusing on the subject.",
    imageUrl: "https://images.unsplash.com/photo-1473881823110-d94cac66318a?q=80&w=2070&auto=format&fit=crop",
    category: "Street",
    date: "2023-09-18",
    featured: true
  },
  {
    id: 6,
    title: "Wildlife Close-up",
    description: "Close-up shot of a wild animal. Patience and a telephoto lens were key to capturing this intimate moment without disturbing the subject. The photograph reveals details and expressions rarely seen by the human eye.",
    imageUrl: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=2070&auto=format&fit=crop",
    category: "Wildlife",
    date: "2023-10-30",
    featured: true
  },
  {
    id: 7,
    title: "Autumn Forest",
    description: "Colorful autumn forest landscape. The vibrant reds, oranges, and yellows create a tapestry of color that celebrates the changing seasons. This image was captured during peak fall foliage to maximize the color impact.",
    imageUrl: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=2070&auto=format&fit=crop",
    category: "Landscape",
    date: "2023-11-15",
    featured: false
  },
  {
    id: 8,
    title: "City at Night",
    description: "Urban cityscape with lights at night. The long exposure captures the energy and movement of the city after dark, with light trails from vehicles adding dynamic elements to the composition.",
    imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2064&auto=format&fit=crop",
    category: "Architecture",
    date: "2023-12-05",
    featured: false
  },
  {
    id: 9,
    title: "Desert Dunes",
    description: "Sand dunes in a vast desert landscape. The interplay of light and shadow creates graphic patterns that change throughout the day. This photograph was taken during the golden hour to emphasize the texture and form of the dunes.",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop",
    category: "Landscape",
    date: "2024-01-20",
    featured: false
  },
  {
    id: 10,
    title: "Macro Photography",
    description: "Close-up of water droplets on a leaf. Macro photography reveals a world invisible to the naked eye, where tiny details become magnificent subjects. This image required specialized macro equipment and careful lighting to achieve the perfect clarity.",
    imageUrl: "https://images.unsplash.com/photo-1429198739803-7db875882052?q=80&w=2073&auto=format&fit=crop",
    category: "Macro",
    date: "2024-02-10",
    featured: false
  },
  {
    id: 11,
    title: "Street Art",
    description: "Colorful mural on urban wall. This photograph documents the vibrant street art culture that transforms urban spaces into open-air galleries. The composition balances showing the artwork in context while highlighting its details.",
    imageUrl: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=2045&auto=format&fit=crop",
    category: "Street",
    date: "2024-03-05",
    featured: false
  },
  {
    id: 12,
    title: "Mountain Lake",
    description: "Serene lake surrounded by mountains. The perfect reflection creates a mirror image that doubles the beauty of the landscape. This photograph was taken at dawn when the water was completely still and the light was soft and even.",
    imageUrl: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=2000&auto=format&fit=crop",
    category: "Landscape",
    date: "2024-04-15",
    featured: false
  }
];

export default PhotoPage;