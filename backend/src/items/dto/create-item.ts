import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  content: string;
}
