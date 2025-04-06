import { fine } from "@/lib/fine";
import { Schema } from "@/lib/db-types";
import { sampleAlbums, sampleTags, generateSamplePhotos, generatePhotoTags } from "./sample-data";

export async function initializeDatabase() {
  try {
    // Check if we already have data
    const existingAlbums = await fine.table("albums").select();
    
    if (existingAlbums && existingAlbums.length > 0) {
      console.log("Database already initialized");
      return;
    }
    
    console.log("Initializing database with sample data...");
    
    // Insert albums
    const albums = await fine.table("albums").insert(sampleAlbums).select();
    const albumIds = albums.map(album => album.id);
    
    // Insert tags
    const tags = await fine.table("tags").insert(sampleTags).select();
    const tagIds = tags.map(tag => tag.id);
    
    // Generate and insert photos
    const photoData = generateSamplePhotos(albumIds);
    const photos = await fine.table("photos").insert(photoData).select();
    const photoIds = photos.map(photo => photo.id);
    
    // Update album coverImageIds
    for (let i = 0; i < albumIds.length; i++) {
      const albumPhotos = photos.filter(photo => photo.albumId === albumIds[i]);
      if (albumPhotos.length > 0) {
        await fine.table("albums")
          .update({ coverImageId: albumPhotos[0].id })
          .eq("id", albumIds[i]);
      }
    }
    
    // Generate and insert photo tags
    const photoTagsData = generatePhotoTags(photoIds, tagIds);
    await fine.table("photo_tags").insert(photoTagsData);
    
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export async function getPhotosByAlbum(albumId?: number) {
  try {
    let query = fine.table("photos").select();
    
    if (albumId) {
      query = query.eq("albumId", albumId);
    }
    
    return await query;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}

export async function getPhotoById(id: number) {
  try {
    const photos = await fine.table("photos").select().eq("id", id);
    return photos && photos.length > 0 ? photos[0] : null;
  } catch (error) {
    console.error("Error fetching photo:", error);
    return null;
  }
}

export async function getPhotoTags(photoId: number) {
  try {
    // This is a more complex query that would typically use a JOIN
    // Since we don't have direct JOIN support, we'll do it in two steps
    const photoTagRelations = await fine.table("photo_tags").select().eq("photoId", photoId);
    
    if (!photoTagRelations || photoTagRelations.length === 0) {
      return [];
    }
    
    const tagIds = photoTagRelations.map(relation => relation.tagId);
    const tags = [];
    
    // Fetch each tag individually
    for (const tagId of tagIds) {
      const tagResults = await fine.table("tags").select().eq("id", tagId);
      if (tagResults && tagResults.length > 0) {
        tags.push(tagResults[0]);
      }
    }
    
    return tags;
  } catch (error) {
    console.error("Error fetching photo tags:", error);
    return [];
  }
}

export async function getAlbumById(id: number) {
  try {
    const albums = await fine.table("albums").select().eq("id", id);
    return albums && albums.length > 0 ? albums[0] : null;
  } catch (error) {
    console.error("Error fetching album:", error);
    return null;
  }
}