import { UrlStore, type StoredUrl } from './url-store';

export class InMemoryUrlStore extends UrlStore {
  private readonly data = new Map<string, StoredUrl>();

  override save(url: StoredUrl): Promise<void> {
    this.data.set(url.code, url);
    return Promise.resolve();
  }

  override findByCode(code: string): Promise<StoredUrl | null> {
    return Promise.resolve(this.data.get(code) ?? null);
  }

  override incrementVisitCount(code: string): Promise<void> {
    const current = this.data.get(code);
    if (!current) return Promise.resolve();

    this.data.set(code, { ...current, visitCount: current.visitCount + 1 });
    return Promise.resolve();
  }
}
