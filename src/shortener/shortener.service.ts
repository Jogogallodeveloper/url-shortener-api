import { Injectable } from '@nestjs/common';

type StoredUrl = {
  originalUrl: string;
  createdAt: Date;
};

@Injectable()
export class ShortenerService {
  private readonly urlStore = new Map<string, StoredUrl>();

  createShortUrl(originalUrl: string): string {
    const code = this.generateCode();

    this.urlStore.set(code, {
      originalUrl,
      createdAt: new Date(),
    });

    return code;
  }

  getUrl(code: string): StoredUrl | undefined {
    return this.urlStore.get(code);
  }

  private generateCode(length = 6): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }
}
