import { Injectable } from '@nestjs/common';

import CountryService from './country/country.service';

@Injectable()
export default class AppService {
  constructor(private readonly countryService: CountryService) {}

  replyHello(senderName: string) {
    return (
      `Halo ${senderName},\n\n` +
      'Saya adalah bot yang didesain untuk memberikan info kasus COVID-19 di Indonesia.\n' +
      'Sumber data didapatkan dari API yang disediakan oleh Open Disease Data API (https://corona.lmao.ninja/).\n' +
      'Ketikkan ```/help``` untuk mendapatkan informasi mengenai saya dan daftar perintah yang tersedia.'
    );
  }

  replyNasional() {
    return this.countryService.getStatsMessage();
  }

  replyHelp() {
    return (
      'Daftar perintah:\n' +
      '1. ```/halo``` -> Perkenalan bot\n' +
      '2. ```/nasional``` -> Statistik COVID-19 di Indonesia\n' +
      '3. ```/help``` -> Daftar perintah\n\n' +
      '_Versi 1.0 - 17/05/2020 20.00: Bot dibuat._\n' +
      '_Versi 2.0 - 13/05/2023 10.06: Penggantian API & penghapusan fitur statistik per-provinsi._'
    );
  }

  replyUnknown() {
    return 'Maaf perintah tidak dikenali, kirimkan saya ```/help``` untuk melihat daftar perintah.';
  }
}
