export type StoredUrl = {
  code: string;
  originalUrl: string;
  createdAt: Date;
  visitCount: number;
};

// This is the "Port" (contract) in Clean Architecture.
// Using an abstract class makes it a runtime token for Nest DI.
export abstract class UrlStore {
  abstract save(url: StoredUrl): Promise<void>;

  abstract findByCode(code: string): Promise<StoredUrl | null>;

  abstract incrementVisitCount(code: string): Promise<void>;
}
