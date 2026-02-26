import { PickType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create-user.dto";
import { IsNotEmpty, IsString, IsUUID } from "@nestjs/class-validator";
import { UUID } from "crypto";
import { IsArray, IsEnum, IsNumber, IsOptional } from "class-validator";
import { UserRole } from "src/config/enum.config";
import { Transform, Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional, OmitType } from "@nestjs/swagger";

export class UserDTO extends OmitType(CreateUserDTO, ["password"]){
    @ApiProperty({
        type: String,
        description: "Email of the user"
    })
    @IsNotEmpty()
    @IsUUID()
    userId:UUID;
    role:UserRole;
}

export class QueryAllEmployeesDTO{

    @ApiProperty({
        enum:UserRole,
        description: "Role of the user",
        example: [UserRole.Admin, UserRole.Employee],
        isArray:true,
        type:[Number]
    })
    @IsNotEmpty()
    @IsArray()
    @IsEnum(UserRole, {each:true})
    @Transform(({value})=>{
        try {
        // Try parsing JSON array
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed.map(Number);
      } catch {
        // Fallback for comma-separated
        return value.split(',').map(Number);
        return value;
      }
    })
    // @Type(()=>Number)
    userType:UserRole[];

    @ApiProperty({
        type: Number,
        description: 'limit of per page'
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(()=>Number)
    limit:number

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(()=>Number)
    page:number;

    @ApiPropertyOptional({
        type: String,
        description: 'String to be searched based on the basis of name, email and employee id'
    })
    @IsString()
    @IsOptional()
    searchString:string;
}