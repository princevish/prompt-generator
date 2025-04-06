import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PhotoGrid } from "@/components/PhotoGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { fine } from "@/lib/fine";
import type { Schema } from "@/lib/db-types";

const Gallery = () => {
  const [photos, setPhotos] = useState<Schema["photos"][]>([]);
  const [categories, setCategories] = useState<Schema["categories"][]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch photos
        const photosData = await fine.table("photos").select();
        
        if (!photosData || photosData.length === 0) {
          // Use sample data if database is empty
          setPhotos(samplePhotos);
          
          // Extract unique categories from sample data
          const uniqueCategories = Array.from(
            new Set(samplePhotos.map((photo) => photo.category))
          ).map((name, index) => ({
            id: index + 1,
            name: name,
            description: null
          }));
          
          setCategories(uniqueCategories);
        } else {
          setPhotos(photosData);
          
          // Fetch categories or extract from photos
          try {
            const categoriesData = await fine.table("categories").select();
            if (categoriesData && categoriesData.length > 0) {
              setCategories(categoriesData);
            } else {
              // Extract unique categories from photos
              const uniqueCategories = Array.from(
                new Set(photosData.map((photo) => photo.category))
              ).map((name, index) => ({
                id: index + 1,
                name: name,
                description: null
              }));
              
              setCategories(uniqueCategories);
            }
          } catch (error) {
            // Extract unique categories from photos as fallback
            const uniqueCategories = Array.from(
              new Set(photosData.map((photo) => photo.category))
            ).map((name, index) => ({
              id: index + 1,
              name: name,
              description: null
            }));
            
            setCategories(uniqueCategories);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Use sample data as fallback
        setPhotos(samplePhotos);
        
        // Extract unique categories from sample data
        const uniqueCategories = Array.from(
          new Set(samplePhotos.map((photo) => photo.category))
        ).map((name, index) => ({
          id: index + 1,
          name: name,
          description: null
        }));
        
        setCategories(uniqueCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-muted-foreground mb-6">
              Browse through the collection of photographs organized by categories.
            </p>
          </div>
          
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          
          <PhotoGrid
            photos={photos}
            category={activeCategory}
            loading={loading}
          />
        </div>
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
    description: "Beautiful sunrise over mountain peaks",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    category: "Landscape",
    date: "2023-05-15",
    featured: true
  },
  {
    id: 2,
    title: "Urban Architecture",
    description: "Modern city buildings from below",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop",
    category: "Architecture",
    date: "2023-06-22",
    featured: true
  },
  {
    id: 3,
    title: "Portrait in Natural Light",
    description: "Portrait photography using natural window light",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop",
    category: "Portrait",
    date: "2023-07-10",
    featured: true
  },
  {
    id: 4,
    title: "Ocean Waves",
    description: "Dramatic ocean waves during sunset",
    imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2057&auto=format&fit=crop",
    category: "Seascape",
    date: "2023-08-05",
    featured: true
  },
  {
    id: 5,
    title: "Street Photography",
    description: "Candid moment on a busy street",
    imageUrl: "https://images.unsplash.com/photo-1473881823110-d94cac66318a?q=80&w=2070&auto=format&fit=crop",
    category: "Street",
    date: "2023-09-18",
    featured: true
  },
  {
    id: 6,
    title: "Wildlife Close-up",
    description: "Close-up shot of a wild animal",
    imageUrl: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=2070&auto=format&fit=crop",
    category: "Wildlife",
    date: "2023-10-30",
    featured: true
  },
  {
    id: 7,
    title: "Autumn Forest",
    description: "Colorful autumn forest landscape",
    imageUrl: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=2070&auto=format&fit=crop",
    category: "Landscape",
    date: "2023-11-15",
    featured: false
  },
  {
    id: 8,
    title: "City at Night",
    description: "Urban cityscape with lights at night",
    imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2064&auto=format&fit=crop",
    category: "Architecture",
    date: "2023-12-05",
    featured: false
  },
  {
    id: 9,
    title: "Desert Dunes",
    description: "Sand dunes in a vast desert landscape",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop",
    category: "Landscape",
    date: "2024-01-20",
    featured: false
  },
  {
    id: 10,
    title: "Macro Photography",
    description: "Close-up of water droplets on a leaf",
    imageUrl: "https://images.unsplash.com/photo-1429198739803-7db875882052?q=80&w=2073&auto=format&fit=crop",
    category: "Macro",
    date: "2024-02-10",
    featured: false
  },
  {
    id: 11,
    title: "Street Art",
    description: "Colorful mural on urban wall",
    imageUrl: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=2045&auto=format&fit=crop",
    category: "Street",
    date: "2024-03-05",
    featured: false
  },
  {
    id: 12,
    title: "Mountain Lake",
    description: "Serene lake surrounded by mountains",
    imageUrl: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=2000&auto=format&fit=crop",
    category: "Landscape",
    date: "2024-04-15",
    featured: false
  }
];

export default Gallery;