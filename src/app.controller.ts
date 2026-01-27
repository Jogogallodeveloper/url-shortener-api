import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EchoDto } from './dto/echo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('echo')
  echo(@Body() dto: EchoDto) {
    return {
      result: Array(dto.times).fill(dto.message).join('  '),
    };
  }
  getHello(): string {
    return this.appService.getHello();
  }
}
