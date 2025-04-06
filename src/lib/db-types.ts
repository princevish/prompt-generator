export type Schema = {
  albums: {
    id?: number;
    title: string;
    description?: string | null;
    coverImageId?: number | null;
  };
  photos: {
    id?: number;
    title: string;
    description?: string | null;
    imageUrl: string;
    date: string;
    albumId?: number | null;
  };
  tags: {
    id?: number;
    name: string;
  };
  photo_tags: {
    photoId: number;
    tagId: number;
  };
};