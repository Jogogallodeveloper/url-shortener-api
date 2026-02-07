import { UrlStore, StoredUrl } from './url-store';

export class InMemoryUrlStore implements UrlStore {
  private readonly store = new Map<string, StoredUrl>();

  async create(input: {
    code: string;
    originalUrl: string;
  }): Promise<StoredUrl> {
    const record: StoredUrl = {
      code: input.code,
      originalUrl: input.originalUrl,
      createdAt: new Date(),
      visitCount: 0,
    };

    this.store.set(input.code, record);
    return record;
  }

  async findByCode(code: string): Promise<StoredUrl | null> {
    return this.store.get(code) ?? null;
  }

  async incrementVisitCount(code: string): Promise<void> {
    const current = this.store.get(code);
    if (!current) return;

    this.store.set(code, {
      ...current,
      visitCount: current.visitCount + 1,
    });
  }
}
