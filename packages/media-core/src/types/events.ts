import type { MediaType } from './media';

export interface MediaViewEvent {
  type: 'view';
  mediaId: number;
  mediaType: MediaType;
  timestamp: number;
}

export interface MediaDownloadEvent {
  type: 'download';
  mediaId: number;
  mediaType: MediaType;
  timestamp: number;
}

export type MediaEvent = MediaViewEvent | MediaDownloadEvent;
export type MediaEventType = MediaEvent['type'];
export type MediaEventListener<T extends MediaEventType = MediaEventType> = (
  event: Extract<MediaEvent, { type: T }>
) => void;
