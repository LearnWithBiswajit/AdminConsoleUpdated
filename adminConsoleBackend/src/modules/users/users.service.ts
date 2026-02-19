import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUserRepository, IUserService } from './interfaces/users.interface';
import { CreateUserDTO, UpdateUserDTO } from './dto/create-user.dto';
import { QueryAllEmployeesDTO, UserDTO } from './dto/user.dto';
import { UserMapper } from './mapper/user.mapper';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { UUID } from 'crypto';
import { IDevicesService } from '../devices/interfaces/device.interface';
import { IUserDevicesService } from '../UserDevices/interface/userAssignedToDevices.interface';
import { UserRole } from 'src/config/enum.config';
import { AppUser } from './entities/appUser.entity';

@Injectable()
export class UsersService implements IUserService {

    constructor(@Inject("IUserRepository") private readonly userRepository:IUserRepository, @Inject("IDevicesService") private readonly deviceService:IDevicesService, @Inject("IUserDevicesService") private readonly assetsServices:IUserDevicesService){}
    logger = new Logger();

    public async registerUser(userInfo: CreateUserDTO): Promise<UserDTO> {
        try {
            let user:UserDTO|null = await this.getUserByEmail(userInfo.email);
            if(user !== null){
                throw new Error("Email Already Exists");
            }
            const salt = await bcrypt.genSalt(12);
            userInfo.password = await bcrypt.hash(userInfo.password, salt);
            let userEntity:User = UserMapper.mapToEntity(userInfo);
            userEntity = await this.userRepository.insertUser(userEntity);
            let userDto = UserMapper.mapToDTO(userEntity);
            return Promise.resolve(userDto);
        } catch (error) {
            this.logger.error("This error occurred in UserService. Method Name:registerUser", error);
            return Promise.reject(error);
        }
    }

    public async findAllUsersByType(query:QueryAllEmployeesDTO): Promise<Record<string, UserDTO[]|number>> {
        try {
            const employees:User[] = await this.userRepository.getAllUsersByType(query);
            const res:UserDTO[] = employees.map((employee:User)=>UserMapper.mapToDTO(employee));
            const {TotalCount} = await this.userRepository.getTotalCountByType(query);
            return Promise.resolve({employees:res, totalCount:TotalCount});
        } catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: findAllUsersByType", error);
            return Promise.reject(error);
        }
    }

    public async deleteUserById(userId: UUID): Promise<Record<string, number>> {
        // try {
        //     let userRes = await this.userRepository.deleteUserById(userId);
        //     let deviceRes:Record<string, number>;
        //     if(userRes>0){
        //         deviceRes = await this.deviceService.deleteDevicesByUserId(userId);
        //     }
        //     return Promise.resolve({affectedRows:userRes})
        // } catch (error) {
        //     this.logger.error("This error occurred in UserService. Method Name: deleteUserById", error);
        //     return Promise.reject(error);
        // }
         try {
            let userRes = await this.userRepository.deleteUserById(userId);
            let deviceRes:Record<string, number>;
            if(userRes>0){
                // deviceRes = await this.deviceService.deleteDevicesByUserId(userId);
                deviceRes= await this.assetsServices.deleteAssignedDevicesOfUser(userId)
            }
            // let softwareRes= await this.softwareRepository.deleteApplicationInDevice()
            return Promise.resolve({affectedRows:userRes})
        } catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: deleteUserById", error);
            return Promise.reject(error);
        }
    }

    public async getUserByEmail(email: string): Promise<UserDTO | null> {
        try {
            let res:User|null = await this.userRepository.getUserByEmail(email);
            let user:UserDTO;
            if(res !== null){
                user = UserMapper.mapToDTO(res);
            }
            return Promise.resolve(res);
        } catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: deleteUserById", error);
            return Promise.reject(error);
        }
    }

    public async updateEmployee(body:UpdateUserDTO):Promise<UserDTO>{
        try{
            if(body.password){
                const salt = await bcrypt.genSalt(12);
                body.password = await bcrypt.hash(body.password, salt);
            }
            let userEntity:User = UserMapper.mapToUpdateEntity(body);
            let res:User= await this.userRepository.updateEmployee(userEntity);
            let user:UserDTO;
            user = UserMapper.mapToDTO(res);
            return Promise.resolve(user);
        }catch(error){
            this.logger.error("This error occurred in UserService. Method Name: updateEmployee", error);
            return Promise.reject(error);
        }
    }

    public async updateToAdmin(body:UpdateUserDTO, userInfo:User):Promise<Record<string, string>>{
        try{
            if(userInfo.role !== UserRole.SuperAdmin){
                throw new Error("You are not authorized to perform this operation");
            }
            let res:number= await this.userRepository.updateRole(body, UserRole.Admin);
            if (res> 0) {
                return Promise.resolve({userId:body.userId});
            }
            return Promise.resolve({ message: "No Such User Found" });
        }catch(error){
            this.logger.error("This error occurred in UserService. Method Name: updateToAdmin", error);
            return Promise.reject(error);
        }
    }

    public async revokeAdminPermission(body: UpdateUserDTO, userInfo:User): Promise<Record<string, string>> {
        try {if(userInfo.role !== UserRole.SuperAdmin){
            throw new Error("You are not authorized to perform this operation");
        }
            let res:number = await this.userRepository.updateRole(body, UserRole.Employee);
            if(res > 0){
                return Promise.resolve({userId:body.userId});
            }
            return Promise.resolve({message:"No Such User Found"});
        } catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: revokeAdminPermission", error);
            return Promise.reject(error);
        }
    }

    public async registerAppUser(userInfo: CreateUserDTO): Promise<UserDTO> {
        try {
            let user:AppUser = UserMapper.mapToAppEntity(userInfo);
            // user.employeeId = "ARC-IND-2029";
            user = await this.userRepository.createAppUser(user);
            let createdUser:UserDTO = UserMapper.mapToAppDTO(user);
            return Promise.resolve(createdUser);
        } catch (error) {
            this.logger.error("This error occurred in UserService. Method Name: registerAppUser", error);
            return Promise.reject(error);
        }
    }

}
