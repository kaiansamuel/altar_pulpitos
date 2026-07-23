import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Matches, Min, MinLength } from 'class-validator';

export class CategoryDto {
  @IsString() @MinLength(2) name!: string;
  @IsString() @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) slug!: string;
}
export class ProductDto {
  @IsString() @MinLength(2) name!: string;
  @IsString() @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) slug!: string;
  @IsString() @MinLength(10) description!: string;
  @IsString() dimensions!: string;
  @IsString() categoryId!: string;
  @IsOptional() @IsBoolean() isPublished?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
}
