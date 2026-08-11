import type {
  MediaPhoto,
  PaginatedResponse,
  PaginationParams,
  SearchParams,
} from "../types";
import { PexelsClient } from "./pexels-client";

interface PexelsPhotoPage {
  photos: MediaPhoto[];
  page: number;
  per_page: number;
  total_results: number;
  next_page?: string;
  prev_page?: string;
}

const mapPhoto = (photo: any): MediaPhoto => ({ ...photo, type: "photo" });
const mapPage = (page: PexelsPhotoPage): PaginatedResponse<MediaPhoto> => ({
  items: page.photos.map(mapPhoto),
  pagination: {
    page: page.page,
    perPage: page.per_page,
    totalResults: page.total_results,
    nextPage: page.next_page ? page.page + 1 : undefined,
    prevPage: page.prev_page ? page.page - 1 : undefined,
  },
});

export class PhotoApi {
  constructor(private readonly client: PexelsClient) {}
  async search(params: SearchParams): Promise<PaginatedResponse<MediaPhoto>> {
    return mapPage(
      await this.client.request<PexelsPhotoPage>("/search", {
        query: params.query,
        page: params.page ?? 1,
        per_page: params.perPage ?? 20,
      }),
    );
  }
  async curated(
    params: PaginationParams = {},
  ): Promise<PaginatedResponse<MediaPhoto>> {
    return mapPage(
      await this.client.request<PexelsPhotoPage>("/curated", {
        page: params.page ?? 1,
        per_page: params.perPage ?? 20,
      }),
    );
  }
  async getById(id: number): Promise<MediaPhoto> {
    const photo = await this.client.request<any>(`/photos/${id}`);
    return mapPhoto(photo);
  }
}
