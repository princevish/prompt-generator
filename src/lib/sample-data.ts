import { Schema } from "./db-types";

export const sampleAlbums: Schema["albums"][] = [
  {
    title: "Landscapes",
    description: "Beautiful natural landscapes from around the world",
  },
  {
    title: "Urban",
    description: "City life and architecture",
  },
  {
    title: "Portraits",
    description: "Expressive portrait photography",
  },
  {
    title: "Wildlife",
    description: "Animals in their natural habitats",
  }
];

export const sampleTags: Schema["tags"][] = [
  { name: "Nature" },
  { name: "City" },
  { name: "People" },
  { name: "Animals" },
  { name: "Architecture" },
  { name: "Travel" },
  { name: "Black and White" },
  { name: "Sunset" },
  { name: "Water" },
  { name: "Mountains" }
];

export const generateSamplePhotos = (albumIds: number[]): Schema["photos"][] => {
  const photos: Schema["photos"][] = [];
  
  // Landscape photos
  const landscapeUrls = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
  ];
  
  landscapeUrls.forEach((url, index) => {
    photos.push({
      title: `Landscape ${index + 1}`,
      description: "A beautiful natural landscape capturing the essence of nature",
      imageUrl: url,
      date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      albumId: albumIds[0]
    });
  });
  
  // Urban photos
  const urbanUrls = [
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb",
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    "https://images.unsplash.com/photo-1444723121867-7a241cacace9"
  ];
  
  urbanUrls.forEach((url, index) => {
    photos.push({
      title: `Urban Scene ${index + 1}`,
      description: "City life captured in a moment",
      imageUrl: url,
      date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      albumId: albumIds[1]
    });
  });
  
  // Portrait photos
  const portraitUrls = [
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  ];
  
  portraitUrls.forEach((url, index) => {
    photos.push({
      title: `Portrait ${index + 1}`,
      description: "Expressive portrait capturing human emotion",
      imageUrl: url,
      date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      albumId: albumIds[2]
    });
  });
  
  // Wildlife photos
  const wildlifeUrls = [
    "https://images.unsplash.com/photo-1564349683136-77e08dba1ef3",
    "https://images.unsplash.com/photo-1504173010664-32509aeebb62",
    "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46",
    "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
    "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f"
  ];
  
  wildlifeUrls.forEach((url, index) => {
    photos.push({
      title: `Wildlife ${index + 1}`,
      description: "Animals in their natural habitat",
      imageUrl: url,
      date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      albumId: albumIds[3]
    });
  });
  
  return photos;
};

export const generatePhotoTags = (photoIds: number[], tagIds: number[]): Schema["photo_tags"][] => {
  const photoTags: Schema["photo_tags"][] = [];
  
  photoIds.forEach(photoId => {
    // Assign 1-3 random tags to each photo
    const numTags = Math.floor(Math.random() * 3) + 1;
    const shuffledTags = [...tagIds].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < numTags; i++) {
      photoTags.push({
        photoId,
        tagId: shuffledTags[i]
      });
    }
  });
  
  return photoTags;
};