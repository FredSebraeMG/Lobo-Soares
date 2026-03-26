export interface Work {
  id: string;
  title: string;
  description: string;
  mediaType: 'text' | 'image' | 'audio' | 'video';
  mediaUrl: string;
  category: string;
  price?: number;
  externalLink?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Profile {
  bio: string;
  photoUrl: string;
  email: string;
  phone: string;
  address: string;
}
