import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('test')
  getTest(): string {
    return 'This is a test API endpoint';
  }
}
