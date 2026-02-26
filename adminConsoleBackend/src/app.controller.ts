import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/publicRoute.decorator';

@Controller("ping")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): any {
    return this.appService.getHello();
  }
}
