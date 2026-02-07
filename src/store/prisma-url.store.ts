import { Injectable } from '@nestjs/common';
import { UrlStore } from './url-store';
import { StoredUrl } from 'src/type/stored.type';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaUrlStore implements UrlStore {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: {
    code: string;
    originalUrl: string;
  }): Promise<StoredUrl> {
    const created = await this.prisma.short_urls.create({
      data: {
        code: input.code,
        originalUrl: input.originalUrl,
      },
    });

    return {
      code: created.code,
      originalUrl: created.originalUrl,
      createdAt: created.createdAt,
      visitCount: created.visitCount,
    };
  }

  async findByCode(code: string): Promise<StoredUrl | null> {
    const found = await this.prisma.short_urls.findUnique({
      where: { code },
    });

    if (!found) return null;

    return {
      code: found.code,
      originalUrl: found.originalUrl,
      createdAt: found.createdAt,
      visitCount: found.visitCount,
    };
  }

  async incrementVisitCount(code: string): Promise<void> {
    await this.prisma.short_urls.update({
      where: { code },
      data: {
        visitCount: { increment: 1 },
      },
    });
  }
}
