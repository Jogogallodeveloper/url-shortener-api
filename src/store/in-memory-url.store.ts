import { Injectable } from '@nestjs/common';
import { UrlStore } from './url-store';
import { StoredUrl } from 'src/type/stored.type';

@Injectable()
export class InMemoryUrlStore implements UrlStore {
  private readonly store = new Map<string, StoredUrl>();

  create(input: { code: string; originalUrl: string }): Promise<StoredUrl> {
    const record: StoredUrl = {
      code: input.code,
      originalUrl: input.originalUrl,
      createdAt: new Date(),
      visitCount: 0,
    };

    this.store.set(input.code, record);
    return Promise.resolve(record);
  }

  findByCode(code: string): Promise<StoredUrl | null> {
    return Promise.resolve(this.store.get(code) ?? null);
  }

  incrementVisitCount(code: string): Promise<void> {
    const current = this.store.get(code);
    if (!current) return Promise.resolve();

    this.store.set(code, {
      ...current,
      visitCount: current.visitCount + 1,
    });

    return Promise.resolve();
  }
}
