import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ReservationsDTO } from './reservation.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getIndexForm() {
    return {
      foglalasok: await this.appService.getCurrentFoglalasok(),
    }
  }

  @Post('')
  @Render('index')
  async createFoglalas(@Body() body: ReservationsDTO) {
    return {
      felvetel: await this.appService.createFoglalas(body),
      foglalasok: await this.appService.getCurrentFoglalasok(),
    }
  }
}
