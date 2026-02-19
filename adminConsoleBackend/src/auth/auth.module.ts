import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/users/users.repository';

@Module({
  imports:[UsersModule,
    JwtModule.register({
      global:true,
      secret:"jwt_secret",
      signOptions:{expiresIn:"1d"}
    })
  ],
  controllers: [AuthController],
  providers: [{provide:"IAuthService", useClass:AuthService}]
})
export class AuthModule {}
