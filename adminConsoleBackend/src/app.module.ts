import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { DevicesModule } from './modules/devices/devices.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './modules/users/entities/user.entity';
import { Device } from './modules/devices/entities/device.entity';
import { DeviceUsageHistory } from './modules/devices/entities/deviceHistory.entity';
import { UserRepository } from './modules/users/users.repository';
import { GuardsGuard } from './guards/guards.guard';
import { PdfModule } from './modules/pdfs/pdf.module';
import { ConfigModule } from '@nestjs/config';
import { UsersAssets } from './modules/UserDevices/entities/user_devices.entity';
import { AppUser } from './modules/users/entities/appUser.entity';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:".env", isGlobal:true}),
    TypeOrmModule.forRootAsync({
      name:"default",
      useFactory:async()=>{
        return dbConfig()
      }
    }),
    DevicesModule,
    UsersModule,
    AuthModule,
    PdfModule,
    TypeOrmModule.forFeature([User, Device, DeviceUsageHistory, UsersAssets, AppUser])
  ],
  controllers: [AppController],
  providers: [{provide:APP_INTERCEPTOR, useClass:TransformInterceptor},AppService, {provide:"IUserRepository", useClass:UserRepository},
    {provide:APP_GUARD, useClass:GuardsGuard}
  ],
})
export class AppModule {}
