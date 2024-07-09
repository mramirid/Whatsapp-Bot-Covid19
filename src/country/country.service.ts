import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { from, map, mergeMap, of, retry, tap } from 'rxjs';

import UpstreamAPI from '../upstream-api/upstream-api.abstract';
import type CountryStats from './country-stats.interface';

@Injectable()
export default class CountryService {
  private readonly STATS_CACHE_KEY = 'COUNTRY_STATS_CACHE';

  constructor(
    private readonly upstreamAPI: UpstreamAPI,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  getStatsMessage() {
    return this.getStats().pipe(
      map((stats) => this.localizeStats(stats)),
      map(
        (stats) =>
          '*Statistik COVID-19 di Indonesia*\n\n' +
          `Total: ${stats.cases} (+${stats.todayCases})\n` +
          `Sembuh: ${stats.recovered} (+${stats.todayRecovered})\n` +
          `Meninggal: ${stats.deaths} (+${stats.todayDeaths})\n` +
          `Dirawat: ${stats.active}\n` +
          `Kritis: ${stats.critical}\n\n` +
          `Tetap jaga kesehatan dan patuhi protokol kesehatan.\n\n` +
          `_Pembaharuan terakhir pada ${stats.updatedAt}._`,
      ),
    );
  }

  private getStats() {
    return from(this.cacheManager.get<CountryStats>(this.STATS_CACHE_KEY)).pipe(
      mergeMap((cachedStats) => {
        if (cachedStats) {
          return of(cachedStats);
        }
        return this.upstreamAPI.getCountryStats().pipe(
          retry(2),
          tap((stats) => {
            this.cacheManager.set(this.STATS_CACHE_KEY, stats);
          }),
        );
      }),
    );
  }

  private localizeStats(
    stats: CountryStats,
  ): Record<keyof CountryStats, string> {
    const numberFormatter = new Intl.NumberFormat('id-ID');
    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'long',
    });

    return {
      cases: numberFormatter.format(stats.cases),
      todayCases: numberFormatter.format(stats.todayCases),
      recovered: numberFormatter.format(stats.recovered),
      todayRecovered: numberFormatter.format(stats.todayRecovered),
      deaths: numberFormatter.format(stats.deaths),
      todayDeaths: numberFormatter.format(stats.todayDeaths),
      active: numberFormatter.format(stats.active),
      critical: numberFormatter.format(stats.critical),
      updatedAt: dateFormatter.format(stats.updatedAt),
    };
  }
}
