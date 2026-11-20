import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      foglalasok: this.appService.getCurrentFoglalasok(),
    }
  }

  @Post()
  createFoglalas(@Body() body: any) {
    return this.appService.createFoglalas(body);
  }
}
