import { Injectable } from '@nestjs/common';

type StoredUrl = {
  originalUrl: string;
  createdAt: Date;
};

@Injectable()
export class ShortenerService {
  // In-memory storage: code -> StoredUrl
  private readonly urlStore = new Map<string, StoredUrl>();

  // Save a URL into memory
  saveUrl(code: string, originalUrl: string): void {
    this.urlStore.set(code, {
      originalUrl,
      createdAt: new Date(),
    });
  }

  // Retrieve a URL from memory
  getUrl(code: string): StoredUrl | undefined {
    return this.urlStore.get(code);
  }
}
