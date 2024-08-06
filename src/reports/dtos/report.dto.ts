import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class ReportDto {
    @ApiProperty({ example: 123423, description: 'The id for the report' })
    @Expose()
    id: number;

    @ApiProperty({ example: 12.23, description: 'Price of the car' })
    @Expose()
    price: number;
    
    @ApiProperty({example: 2024, description: 'Year the car was manufactured'})
    @Expose()
    year: number;
    
    @ApiProperty({example: -120, description: 'The longtitude of where the report was created'})
    @Expose()
    lng: number;
    
    @ApiProperty({example: 50, description: 'The latitude of where the report was created'})
    @Expose()
    lat: number;

    @ApiProperty({example: 'Toyota', description: 'The make of the car'})
    make: string;
    
    @ApiProperty({example: 123423, description: 'The latitude of where the report was created'})
    @Expose()
    model: string;
    
    @Expose()
    mileage: number;
    
    @Transform(({ obj }) => obj?.user?.id)
    @Expose()
    userId: number;
    
    @Expose()
    approved: boolean;
}