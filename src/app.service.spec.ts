import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test } from '@nestjs/testing';
import { firstValueFrom } from 'rxjs';

import AppService from './app.service';
import dummyCountryStats from './country/country-stats.dummy';
import CountryService from './country/country.service';
import UpstreamAPI from './upstream-api/upstream-api.abstract';

let service: AppService;

beforeEach(async () => {
  const cacheManagerMock = {
    get: async () => dummyCountryStats,
  };

  const module = await Test.createTestingModule({
    providers: [
      AppService,
      CountryService,
      { provide: CACHE_MANAGER, useValue: cacheManagerMock },
      { provide: UpstreamAPI, useValue: {} },
    ],
  }).compile();

  service = module.get(AppService);
});

describe('Unit Testing', () => {
  describe('replyHello()', () => {
    it('should reply hello correctly', () => {
      expect(service.replyHello('Amir')).toMatchSnapshot();
    });
  });

  describe('replyHelp()', () => {
    it('should reply help correctly', () => {
      expect(service.replyHelp()).toMatchSnapshot();
    });
  });

  describe('replyUnknown()', () => {
    it('should reply unknown correctly', () => {
      expect(service.replyUnknown()).toMatchSnapshot();
    });
  });
});

describe('Integration Testing', () => {
  describe('replyNasional()', () => {
    it('should return the country stats message in order to reply nasional', async () => {
      const nasionalReplyMessage = await firstValueFrom(
        service.replyNasional(),
      );

      expect(nasionalReplyMessage).toMatchSnapshot();
    });
  });
});
