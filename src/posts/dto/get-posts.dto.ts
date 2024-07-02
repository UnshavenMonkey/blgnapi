import { IsOptional, IsInt, Min, IsString, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostsDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit: number = 10;

    @IsOptional()
    @IsString()
    @IsISO8601()
    startDate?: string;

    @IsOptional()
    @IsString()
    @IsISO8601()
    endDate?: string;
}
