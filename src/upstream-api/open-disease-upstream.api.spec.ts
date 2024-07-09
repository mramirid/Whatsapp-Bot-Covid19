import type { HttpService } from '@nestjs/axios';
import { firstValueFrom, of } from 'rxjs';

import OpenDiseaseUpstreamAPI from './open-disease-upstream.api';

const httpServiceGetMock = jest.fn();
let upstreamAPI: OpenDiseaseUpstreamAPI;

beforeEach(() => {
  const httpServiceMock = { get: httpServiceGetMock } as unknown as HttpService;
  upstreamAPI = new OpenDiseaseUpstreamAPI(httpServiceMock);
});

describe('getCountryStats()', () => {
  const openDiseaseCountryStats = {
    cases: 100,
    todayCases: 10,
    deaths: 5,
    todayDeaths: 1,
    recovered: 90,
    todayRecovered: 7,
    active: 5,
    critical: 2,
    updated: Date.now(),
  };

  it('should return valid country stats when the HTTP request to the Open Disease API is successful', async () => {
    httpServiceGetMock.mockReturnValueOnce(
      of({ data: openDiseaseCountryStats }),
    );

    const result = await firstValueFrom(upstreamAPI.getCountryStats());

    expect(result.cases).toBe(openDiseaseCountryStats.cases);
    expect(result.todayCases).toBe(openDiseaseCountryStats.todayCases);
    expect(result.deaths).toBe(openDiseaseCountryStats.deaths);
    expect(result.todayDeaths).toBe(openDiseaseCountryStats.todayDeaths);
    expect(result.recovered).toBe(openDiseaseCountryStats.recovered);
    expect(result.todayRecovered).toBe(openDiseaseCountryStats.todayRecovered);
    expect(result.active).toBe(openDiseaseCountryStats.active);
    expect(result.critical).toBe(openDiseaseCountryStats.critical);
    expect(result.updatedAt.getTime()).toBe(openDiseaseCountryStats.updated);
  });
});
