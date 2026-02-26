import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IUserRepository } from 'src/modules/users/interfaces/users.interface';
export declare class GuardsGuard implements CanActivate {
    private reflector;
    private readonly userRepository;
    constructor(reflector: Reflector, userRepository: IUserRepository);
    logger: Logger;
    canActivate(context: ExecutionContext): Promise<boolean>;
    verifyUser(token: string): Promise<boolean>;
    fineone(email: string, requestObj?: any): Promise<boolean>;
}
