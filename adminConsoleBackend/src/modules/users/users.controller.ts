import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger, Query, Put, Version } from '@nestjs/common';
import { IUserService } from './interfaces/users.interface';
import { QueryAllEmployeesDTO, UserDTO } from './dto/user.dto';
import { CreateUserDTO, UpdateUserDTO } from './dto/create-user.dto';
import { UUID } from 'crypto';
import { Public } from 'src/decorators/publicRoute.decorator';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';
import { CurrentContext } from 'src/decorators/user.decorator';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(@Inject("IUserService") private readonly usersService: IUserService) { }

  logger = new Logger();

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create new employees',
    description: 'Create a new employee in the database.'
  })
  @ApiBody({
    type: CreateUserDTO
  })
  @ApiCreatedResponse({
    type: UserDTO
  })
  @Post("/create")
  @Public()
  public async registerUser(@Body() userDto: CreateUserDTO): Promise<UserDTO> {
    try {
      const res = await this.usersService.registerUser(userDto);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in UserController. Method Name: registerUser", error);
      return Promise.reject(error);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all the employees',
    description: 'Get the information of all the employees and search for a particular employee.'
  })
  @Get("/employee/active")
  public async allEmployees(@Query() query: QueryAllEmployeesDTO): Promise<Record<string, UserDTO[] | number>> {
    try {
      const res = await this.usersService.findAllUsersByType(query);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in UserController. Method Name: allEmployees", error);
      return Promise.reject(error);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Put("/employee/edit")
  @ApiBody({
    type: UpdateUserDTO
  })
  @ApiOkResponse({
    type: UserDTO
  })
  public async updateEmployee(@Body() body: UpdateUserDTO): Promise<Record<string, string | UserDTO>> {
    try {
      const res = await this.usersService.updateEmployee(body);
      return Promise.resolve({ res: res, message: "User Updated Successfully" });
    } catch (error) {
      this.logger.error("This error occurred in UserController. Method Name: updateEmployee", error);
      return Promise.reject(error);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete the employee',
    description: 'Delete the employee and release all devices assigned to him'
  })
  @ApiParam({
    name: 'userId',
    description: 'Id of the employee',
    type: String
  })
  @Delete("/:userId")
  public async deleteEmployee(@Param("userId") userId: UUID): Promise<any> {
    try {
      let res = await this.usersService.deleteUserById(userId);
      if (res.affectedRows > 0) {
        return Promise.resolve({ message: "User Deleted Successfully" });
      }
    } catch (error) {
      this.logger.error("This error occurred in UserController. Method Name: deleteEmployee", error);
      return Promise.reject(error);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get the employee information',
    description: 'Fetch the employee details by email id'
  })
  @ApiQuery({
    name: 'email',
    description: 'Email Id of the employee',
    type: String
  })
  @Get("/userInfo")
  public async fetchEmployeeById(@Query("email") email:string): Promise<UserDTO|null> {
    try {
      let res = await this.usersService.getUserByEmail(email);
      return Promise.resolve(res);
    } catch (error) {
      this.logger.error("This error occurred in UserController. Method Name: deleteEmployee", error);
      return Promise.reject(error);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    type: UpdateUserDTO
  })
  @Patch("/changeTheRoleToAdmin")
  public async updateToAdmin(@CurrentContext() context:User, @Body() body: UpdateUserDTO):Promise<object>{
    try {
      const res = await this.usersService.updateToAdmin(body, context);
      return Promise.resolve({ userId:res.userId, message: "Admin Access Granted" });
    } catch (error) {
      this.logger.error("This error occurred in UserController. Method Name: updateEmployee", error);
      return Promise.reject(error);
    }
  }

  @Patch("/admin/revoke")
  public async revokeAdminPermission(@CurrentContext() context:User, @Body() body:UpdateUserDTO):Promise<object>{
    try {
      // console.log(context);
      const res = await this.usersService.revokeAdminPermission(body, context);
      return Promise.resolve({ userId:res.userId, message: "Removed From Admin" });
    } catch (error) {
      this.logger.error("This error occurred in UserController. Method Name: revokeAdminPermission", error);
      return Promise.reject(error);
    }
  }

  @Post("/create")
  @Version("2")
  @Public()
  public async registerAppUser(@Body() body:CreateUserDTO):Promise<UserDTO>{
    try {
      return Promise.resolve(this.usersService.registerAppUser(body));
    } catch (error) {
      this.logger.error("This error occurred in UserController. Method Name: registerAppUser", error);
      return Promise.reject(error);
    }
  }
}
