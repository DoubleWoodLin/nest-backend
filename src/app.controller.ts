import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('less-1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
