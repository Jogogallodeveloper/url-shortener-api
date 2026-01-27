import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //load environment variable from .env
    ConfigModule.forRoot({
      isGlobal: true, //make ConfigService avaliable erverywhere without  re-importing
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
