import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Brackets, Repository, UpdateResult } from "typeorm";
import { IUserRepository } from "./interfaces/users.interface";
import { QueryAllEmployeesDTO } from "./dto/user.dto";
import { UUID } from "crypto";
import { UpdateUserDTO } from "./dto/create-user.dto";
import { UserRole } from "src/config/enum.config";
import { AppUser } from "./entities/appUser.entity";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, @InjectRepository(AppUser) private readonly appUserRepo: Repository<AppUser>) { };

    logger = new Logger();

    public async insertUser(userEntity: User): Promise<User> {
        try {
            let res = await this.userRepo.save(userEntity);
            return Promise.resolve(res);
        } catch (error) {
            this.logger.error("This error occurred in UserRepository. Method Name: insertUser", error);
            return Promise.reject(error);
        }
    }

    public async getAllUsersByType(query: QueryAllEmployeesDTO): Promise<User[]> {
        try {
            // const res:User[] = await this.userRepo.find({where:{role:query.userType, isDeleted:false, isActive:true}, skip:(query.page-1)*query.limit, take:query.limit});
            // return Promise.resolve(res);
            let res = this.userRepo.createQueryBuilder("user")
                .where("user.role IN (:...role)", { role: query.userType })
                .andWhere("isDeleted=:isDeleted", { isDeleted: 0 })
                .andWhere("isActive=:isActive", { isActive: 1 })
                .skip((query.page - 1) * query.limit)
                .take(query.limit)
            if (query.searchString && query.searchString.length > 0) {
                res = res.andWhere(new Brackets((qb) => {
                    qb.where("user.firstName LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.middlename LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.lastName LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.Email LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.employeeID LIKE :searchString", { searchString: `%${query.searchString}%` })
                }))
            }

            let user: User[] = await res.getMany()
            return Promise.resolve(user);
        } catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: getAllEmployees", error);
            return Promise.reject(error);
        }
    }

    public async deleteUserById(userId: UUID): Promise<number> {
        try {
            const res: UpdateResult = await this.userRepo.update({ userId: userId }, { isDeleted: true, isActive: false });
            return Promise.resolve(res.affected ? res.affected : 0);
        } catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: deleteUserById", error);
            return Promise.reject(error);
        }
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        try {
            if (!email) {
                throw new Error("Email ID missing.")
            }
            let res: User | null = await this.userRepo.findOne({ where: { email: email, isActive: true, isDeleted: false } });
            return Promise.resolve(res);
        } catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: deleteUserById", error);
            return Promise.reject(error);
        }
    }

    public async getTotalCountByType(query: QueryAllEmployeesDTO): Promise<{ TotalCount: number }> {
        try {
            // const totalCount:number = await this.userRepo.count({where:{role:query.userType, isDeleted:false, isActive:true}});
            let res = this.userRepo.createQueryBuilder("user")
                .where("user.role IN (:...role)", { role: query.userType })
                .andWhere("isDeleted=:isDeleted", { isDeleted: false })
                .andWhere("isActive=:isActive", { isActive: true })
                .skip((query.page - 1) * query.limit)
                .take(query.limit)
            if (query.searchString && query.searchString.length > 0) {
                res = res.andWhere(new Brackets((qb) => {
                    qb.where("user.firstName LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.middlename LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.lastName LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.Email LIKE :searchString", { searchString: `%${query.searchString}%` })
                        .orWhere("user.employeeID LIKE :searchString", { searchString: `%${query.searchString}%` })
                }))
            }
            let count: number = await res.getCount();
            return Promise.resolve({ TotalCount: count });
        } catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: getTotalCountByType", error);
            return Promise.reject(error);
        }
    }

    public async updateEmployee(body: User): Promise<User> {
        try {
            let res = this.userRepo.save(body);
            // .createQueryBuilder()
            //                         .update(User)
            //                         .set(body)
            //                         .where('userId = :userId', { userId: body.userId });
            // let res: UpdateResult = await queryBuilder.execute();
            return Promise.resolve(res);
        } catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: updateEmployee", error);
            return Promise.reject(error);
        }
    }
    public async updateRole(body: UpdateUserDTO, role: UserRole): Promise<number> {
        try {
            let res = await this.userRepo.update({ userId: body.userId }, { role: role });
            if (res.affected && res.affected > 0) {
                return Promise.resolve(res.affected);
            } else {
                return Promise.resolve(0);
            }
        } catch (error) {
            this.logger.error("This error occured in UserRepository. Method Name: updateEmployee", error);
            return Promise.reject(error);
        }
    }

    public async createAppUser(appUserEntity: AppUser): Promise<AppUser> {
        try {
            let res:AppUser = await this.appUserRepo.save(appUserEntity);
            return Promise.resolve(res);
        } catch (error) {
            this.logger.error("This error occurred in UserRepository. Method Name: createAppUser", error);
            return Promise.reject(error);
        }
    }
}