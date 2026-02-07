import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import { URL_STORE, UrlStore } from 'src/store/url-store';

@Injectable()
export class ShortenerService {
  private readonly generateCode = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    6,
  );

  constructor(@Inject(URL_STORE) private readonly urlStore: UrlStore) {}

  async createShortUrl(originalUrl: string): Promise<string> {
    const code = await this.generateUniqueCode();
    await this.urlStore.create({ code, originalUrl });
    return code;
  }

  async findByCode(code: string) {
    return this.urlStore.findByCode(code);
  }

  async registerVisit(code: string): Promise<void> {
    await this.urlStore.incrementVisitCount(code);
  }

  private async generateUniqueCode(maxAttempts = 5): Promise<string> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const code = this.generateCode();
      const exists = await this.urlStore.findByCode(code);

      if (!exists) return code;
    }

    throw new InternalServerErrorException(
      'Failed to generate a unique short code',
    );
  }
}
