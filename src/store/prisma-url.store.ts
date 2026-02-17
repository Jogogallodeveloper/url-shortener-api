import { PrismaService } from 'src/prisma/prisma.service';
import { UrlStore, type StoredUrl } from './url-store';

export class PrismaUrlStore extends UrlStore {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  override async save(url: StoredUrl): Promise<void> {
    await this.prisma.shortUrl.create({
      data: {
        code: url.code,
        originalUrl: url.originalUrl,
        createdAt: url.createdAt,
        visitCount: url.visitCount,
      },
    });
  }

  console.log('T');

  override async findByCode(code: string): Promise<StoredUrl | null> {
    const row = await this.prisma.short_urls.findUnique({
      where: { code },
    });

    if (!row) return null;

    return {
      code: row.code,
      originalUrl: row.originalUrl,
      createdAt: row.createdAt,
      visitCount: row.visitCount,
    };
  }

  override async incrementVisitCount(code: string): Promise<void> {
    await this.prisma.short_urls.update({
      where: { code },
      data: { visitCount: { increment: 1 } },
    });
  }
}
