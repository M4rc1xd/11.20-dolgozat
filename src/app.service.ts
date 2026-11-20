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
    if (!foglalas.name?.trim()){
      return { success: false, message: 'A név mező nem lehet üres' };
    }

    const emailRegex = /^.{1,}@.{1,}$/;
    if (!foglalas.email || !emailRegex.test(foglalas.email)){
      return { success: false, message: 'Az email mező nem megfelelő formátumú' };
    }

    const guests = Number(foglalas.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > 10){
      return { success: false, message: 'A vendégek száma 1 és 10 között kell legyen' };
    }

    if (!foglalas.startDate){
      return { success: false, message: 'A kezdő dátum nem lehet a múltban' };
    }

    const startDate = new Date(foglalas.startDate);
    if (Number.isNaN(startDate.getTime()) || startDate < new Date()){
      return { success: false, message: 'A kezdő dátum nem lehet a múltban' };
    }

    try {
      await mysqlConnection.execute(`
        INSERT INTO reservations (name, email, startDate, guests)
        VALUES (?, ?, ?, ?)
      `, [foglalas.name.trim(), foglalas.email, startDate, guests]);
      return { success: true, message: 'sikeres felvetel' };
    } catch {
      return { success: false, message: 'A foglalás mentése sikertelen' };
    }
  }
}