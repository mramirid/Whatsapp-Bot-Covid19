import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import OpenDiseaseUpstreamAPI from '../upstream-api/open-disease-upstream.api';
import UpstreamAPI from '../upstream-api/upstream-api.abstract';
import CountryService from './country.service';

@Module({
  imports: [CacheModule.register(), HttpModule],
  providers: [
    CountryService,
    { provide: UpstreamAPI, useClass: OpenDiseaseUpstreamAPI },
  ],
  exports: [CountryService],
})
export default class CountryModule {}
