import { Injectable } from '@nestjs/common';
import mysql, { RowDataPacket } from 'mysql2/promise';
import { ReservationsDTO } from './reservation.dto.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'reservations13e'
});


@Injectable()
export class AppService {
  async getCurrentFoglalasok(){
    const [rows] = await mysqlConnection.execute (`
      SELECT name, email, startDate, guests FROM reservations
    `);
    return rows as ReservationsDTO[];
  }

  async createFoglalas(foglalas: ReservationsDTO){
    if (!foglalas.name){
      return { message: 'A név mező kötelező' };
    }

    const emailRegex = /^.{1,}@.{1,}$/;
    if (!emailRegex.test(foglalas.email)){
      return { message: 'Az email mező nem megfelelő formátumú' };
    }

    if (Number(foglalas.guests) <1 || Number(foglalas.guests) > 10){
      return { message: 'A vendégek száma 1 és 10 között kell legyen' };
    }

    if (new Date(foglalas.startDate) < new Date()){
      return { message: 'A kezdő dátum nem lehet a múltban' };
    }

    const [result] = await mysqlConnection.execute(`
      INSERT INTO reservations (name, email, startDate, guests)
      VALUES (?, ?, ?, ?)
    `, [foglalas.name, foglalas.email, foglalas.startDate, foglalas.guests]);
    console.log(result);

  }
}