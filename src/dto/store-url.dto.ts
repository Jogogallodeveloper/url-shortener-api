import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class StoreUrlDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
