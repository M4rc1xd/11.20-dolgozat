import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ReservationsDTO } from './reservation.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getHello() {
    return {
      foglalasok: await this.appService.getCurrentFoglalasok(),
    }
  }

  async getIndexForm(){

  }


  @Post('index')
  @Render('index')
  createFoglalas(@Body() body: ReservationsDTO) {
    return this.appService.createFoglalas(body);
  }
}
