import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

import type OpenDiseaseCountryStats from './open-disease-country-stats.interface';
import UpstreamAPI from './upstream-api.abstract';

@Injectable()
export default class OpenDiseaseUpstreamAPI extends UpstreamAPI {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  getCountryStats() {
    return this.httpService
      .get<OpenDiseaseCountryStats>(
        'https://corona.lmao.ninja/v2/countries/ID?strict=true&query=',
      )
      .pipe(
        map((response) => response.data),
        map((stats) => ({
          cases: stats.cases,
          todayCases: stats.todayCases,
          deaths: stats.deaths,
          todayDeaths: stats.todayDeaths,
          recovered: stats.recovered,
          todayRecovered: stats.todayRecovered,
          active: stats.active,
          critical: stats.critical,
          updatedAt: new Date(stats.updated),
        })),
      );
  }
}
