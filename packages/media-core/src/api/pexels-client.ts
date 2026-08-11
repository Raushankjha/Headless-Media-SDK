import { MediaError } from "../errors/MediaError";

export class PexelsClient {
  constructor(
    private readonly apiKey: string,
    private readonly baseUrl = "https://api.pexels.com/v1",
  ) {
    if (!apiKey)
      throw new MediaError("Pexels API key is required.", {
        code: "MISSING_API_KEY",
      });
  }

  async request<T>(
    path: string,
    params?: Record<string, string | number | undefined>,
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value));
    });

    let response: Response;
    try {
      response = await fetch(url, { headers: { Authorization: this.apiKey } });
    } catch (error) {
      throw new MediaError(
        error instanceof Error ? error.message : "Network request failed.",
        { code: "NETWORK_ERROR" },
      );
    }

    if (!response.ok) {
      let message = `Pexels request failed with status ${response.status}.`;
      try {
        const body = (await response.json()) as { error?: string };
        message = body.error ?? message;
      } catch {
        /* ignore invalid error body */
      }
      throw new MediaError(message, {
        status: response.status,
        code: "API_ERROR",
      });
    }

    return response.json() as Promise<T>;
  }
}
