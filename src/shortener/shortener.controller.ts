import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { StoreUrlDto } from 'src/dto/store-url.dto';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post('store')
  store(@Body() dto: StoreUrlDto) {
    this.shortenerService.saveUrl(dto.code, dto.url);
    return { message: 'URL stored in memory' };
  }

  @Get(':code')
  get(@Param('code') code: string) {
    const data = this.shortenerService.getUrl(code);

    if (!data) {
      throw new NotFoundException('Short code not found');
    }

    return data;
  }
}
