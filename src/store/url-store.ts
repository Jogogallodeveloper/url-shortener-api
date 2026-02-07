import { StoredUrl } from 'src/type/stored.type';

// Nest DI token (interfaces don't exist at runtime).
export const URL_STORE = 'URL_STORE' as const;
export interface UrlStore {
  create(input: { code: string; originalUrl: string }): Promise<StoredUrl>;
  findByCode(code: string): Promise<StoredUrl | null>;
  incrementVisitCount(code: string): Promise<void>;
}
