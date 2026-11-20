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
      const message = 'A név mező nem lehet üres';
    }

    const emailRegex = /^.{1,}@.{1,}$/;
    if (!emailRegex.test(foglalas.email)){
      const message = 'Az email mező nem megfelelő formátumú';
    }

    if (Number(foglalas.guests) <1 || Number(foglalas.guests) > 10){
      const message = 'A vendégek száma 1 és 10 között kell legyen';
    }

    if (new Date(foglalas.startDate) < new Date() || !foglalas.startDate){
      const message = 'A kezdő dátum nem lehet a múltban';
    }

    const [result] = await mysqlConnection.execute(`
      INSERT INTO reservations (name, email, startDate, guests)
      VALUES (?, ?, ?, ?)
    `, [foglalas.name, foglalas.email, new Date(foglalas.startDate), Number(foglalas.guests)]);
    const message = "sikeres felvetel"

  }
}