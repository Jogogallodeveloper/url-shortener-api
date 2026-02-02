import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ConfigService } from '@nestjs/config';
import { ShortenUrlDto } from 'src/dto/shorten.dto';

@Controller()
export class ShortenerController {
  constructor(
    private readonly shortenerService: ShortenerService,
    private readonly configService: ConfigService,
  ) {}

  @Post('shorten')
  shorten(@Body() dto: ShortenUrlDto) {
    const code = this.shortenerService.createShortUrl(dto.url);
    const baseUrl = this.configService.get<string>('BASE_URL');

    return {
      code,
      shortUrl: `${baseUrl}/${code}`,
    };
  }

  @Get(':code')
  @Redirect(undefined, 302)
  redirectToOriginal(@Param('code') code: string) {
    const data = this.shortenerService.getUrl(code);

    if (!data) {
      throw new NotFoundException('Short URL not found');
    }

    return { url: data.originalUrl };
  }
}
