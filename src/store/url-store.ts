export type StoredUrl = {
  code: string;
  originalUrl: string;
  createdAt: Date;
  visitCount: number;
};

// Injection token for Nest DI
export const URL_STORE = Symbol('URL_STORE');

export interface UrlStore {
  create(input: { code: string; originalUrl: string }): Promise<StoredUrl>;
  findByCode(code: string): Promise<StoredUrl | null>;
  incrementVisitCount(code: string): Promise<void>;
}
