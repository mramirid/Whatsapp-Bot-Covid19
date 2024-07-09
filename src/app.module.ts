import { Module } from '@nestjs/common';

import AppController from './app.controller';
import AppService from './app.service';
import CountryModule from './country/country.module';

@Module({
  imports: [CountryModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
