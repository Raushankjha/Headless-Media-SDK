import type {
  MediaVideo,
  PaginatedResponse,
  PaginationParams,
  SearchParams,
} from "../types";
import { PexelsClient } from "./pexels-client";

interface PexelsVideoPage {
  videos: any[];
  page: number;
  per_page: number;
  total_results: number;
  next_page?: string;
  prev_page?: string;
}
const mapVideo = (video: any): MediaVideo => ({
  id: video.id,
  type: "video",
  width: video.width,
  height: video.height,
  duration: video.duration,
  url: video.url,
  image: video.image,
  user: video.user,
  videoFiles: (video.video_files ?? []).map((f: any) => ({
    id: f.id,
    quality: f.quality,
    fileType: f.file_type,
    width: f.width ?? null,
    height: f.height ?? null,
    fps: f.fps ?? null,
    link: f.link,
  })),
});
const mapPage = (page: PexelsVideoPage): PaginatedResponse<MediaVideo> => ({
  items: page.videos.map(mapVideo),
  pagination: {
    page: page.page,
    perPage: page.per_page,
    totalResults: page.total_results,
    nextPage: page.next_page ? page.page + 1 : undefined,
    prevPage: page.prev_page ? page.page - 1 : undefined,
  },
});

export class VideoApi {
  constructor(private readonly client: PexelsClient) {}
  async search(params: SearchParams): Promise<PaginatedResponse<MediaVideo>> {
    return mapPage(
      await this.client.request<PexelsVideoPage>("/videos/search", {
        query: params.query,
        page: params.page ?? 1,
        per_page: params.perPage ?? 15,
      }),
    );
  }
  async popular(
    params: PaginationParams = {},
  ): Promise<PaginatedResponse<MediaVideo>> {
    return mapPage(
      await this.client.request<PexelsVideoPage>("/videos/popular", {
        page: params.page ?? 1,
        per_page: params.perPage ?? 15,
      }),
    );
  }
  async getById(id: number): Promise<MediaVideo> {
    return mapVideo(await this.client.request<any>(`/videos/videos/${id}`));
  }
}
