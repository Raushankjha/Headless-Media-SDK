export class MediaError extends Error {
  readonly status?: number;
  readonly code: string;

  constructor(message: string, options?: { status?: number; code?: string }) {
    super(message);
    this.name = "MediaError";
    this.status = options?.status;
    this.code = options?.code ?? "MEDIA_ERROR";
  }
}
