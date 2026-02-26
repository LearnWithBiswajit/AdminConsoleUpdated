import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Type } from 'class-transformer';
import { IsUUID } from "@nestjs/class-validator";
import { UUID } from "crypto";

export class CreateUserDTO {

    @IsOptional()
    @IsString()
    userId: UUID;

    @ApiProperty({
        type: String,
        description: "Employee Id of the employee",
        example:"ARC-5878-678"
    })
    // @IsNotEmpty()
    @IsOptional()
    @IsString()
    employeeId: string;

    @ApiProperty({
        type:String,
        description: "First Name of the employee",
        example: "Surodoy"
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiPropertyOptional({
        type:String,
        description: "Middle name of the employee",
        example: "Kumar"
    })
    @IsOptional()
    @IsString()
    middleName: string;

    @ApiPropertyOptional({
        type: String,
        description:"Last name of the employee",
        example: "Maity"
    })
    @IsOptional()
    @IsString()
    lastName:string;

    @ApiProperty({
        type:String,
        description: "Email of the employee",
        example:"surodoyMaity@gmail.com"
    })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email:string;

    @ApiPropertyOptional({
        type:String,
        description: "Password of the employee"
    })
    @IsOptional()
    @IsString()
    // @IsStrongPassword()
    password:string;
    
}

export class UpdateUserDTO{

    @ApiProperty({
        type:String,
        description:"id of the employee by system",
        example:"2c2993d1-58d7-4650-a429-33fcd9cd8ad3"
    })
    @IsNotEmpty()
    @IsUUID()
    userId:UUID;

    @ApiPropertyOptional({
        type: String,
        description: "Employee Id of the employee",
        example:"ARC-5878-678"
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    employeeId: string;

    @ApiPropertyOptional({
        type:String,
        description: "First Name of the employee",
        example: "Surodoy"
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiPropertyOptional({
        type:String,
        description: "Middle name of the employee",
        example: "Kumar"
    })
    @IsOptional()
    @IsString()
    middleName: string;

    @ApiPropertyOptional({
        type: String,
        description:"Last name of the employee",
        example: "Maity"
    })
    @IsOptional()
    @IsString()
    lastName:string;

    @ApiPropertyOptional({
        type:String,
        description: "Email of the employee",
        example:"surodoyMaity@gmail.com"
    })
    @IsOptional()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string;

    @ApiPropertyOptional({
        type:String,
        description: "Password the employee"
    })
    @IsOptional()
    @IsString()
    // @IsStrongPassword()
    password:string;
}