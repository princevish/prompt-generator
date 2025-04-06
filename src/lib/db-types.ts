export type Schema = {
  photos: {
    id?: number;
    title: string;
    description: string | null;
    imageUrl: string;
    category: string;
    date: string;
    featured?: boolean;
  };
  
  categories: {
    id?: number;
    name: string;
    description: string | null;
  };
  
  contacts: {
    id?: number;
    name: string;
    email: string;
    message: string;
    date: string;
  };
}