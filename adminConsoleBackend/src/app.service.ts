import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      Status:200,
      Name:"Admin Console",
      Version:"1.0.0"
    };
  }
}
