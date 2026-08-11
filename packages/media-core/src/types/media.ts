export type MediaType = 'photo' | 'video';

export interface MediaPhoto {
  id: number;
  type: 'photo';
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographerUrl: string;
  alt: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

export interface MediaVideoFile {
  id: number;
  quality: string;
  fileType: string;
  width: number | null;
  height: number | null;
  fps?: number | null;
  link: string;
}

export interface MediaVideo {
  id: number;
  type: 'video';
  width: number;
  height: number;
  duration: number;
  url: string;
  image: string;
  user: { id: number; name: string; url: string };
  videoFiles: MediaVideoFile[];
}

export type MediaItem = MediaPhoto | MediaVideo;

export interface Pagination {
  page: number;
  perPage: number;
  totalResults?: number;
  nextPage?: number;
  prevPage?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}
