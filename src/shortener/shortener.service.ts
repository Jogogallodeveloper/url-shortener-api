import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { customAlphabet } from 'nanoid';

type StoredUrl = {
  originalUrl: string;
  createdAt: Date;
};

@Injectable()
export class ShortenerService {
  private readonly urlStore = new Map<string, StoredUrl>();

  // URL-safe alphabet (no confusing chars, no symbols that break URLs)
  private readonly generateCode = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    6,
  );

  createShortUrl(originalUrl: string): string {
    const code = this.generateUniqueCode();

    this.urlStore.set(code, {
      originalUrl,
      createdAt: new Date(),
    });

    return code;
  }

  getUrl(code: string): StoredUrl | undefined {
    return this.urlStore.get(code);
  }

  private generateUniqueCode(maxAttempts = 5): string {
    // In-memory collision prevention.
    // If collision happens repeatedly, we fail fast instead of looping forever.
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const code = this.generateCode();
      if (!this.urlStore.has(code)) {
        return code;
      }
    }

    throw new InternalServerErrorException(
      'Failed to generate a unique short code',
    );
  }
}
