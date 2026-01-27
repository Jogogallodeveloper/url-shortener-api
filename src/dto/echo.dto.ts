/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class EchoDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsInt()
  @Min(1)
  times: number;
}
