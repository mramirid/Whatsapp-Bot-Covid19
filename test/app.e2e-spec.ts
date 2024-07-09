import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import AppController from '../src/app.controller';
import AppService from '../src/app.service';
import dummyCountryStats from '../src/country/country-stats.dummy';
import CountryService from '../src/country/country.service';
import UpstreamAPI from '../src/upstream-api/upstream-api.abstract';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const cacheManagerMock = {
      get: async () => dummyCountryStats,
    };

    const moduleFixture = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        CountryService,
        { provide: CACHE_MANAGER, useValue: cacheManagerMock },
        { provide: UpstreamAPI, useValue: {} },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should reply unknown command with the correct WhatsApp message', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        ProfileName: 'Amir',
        Body: 'Test',
      })
      .expect(200)
      .expect((res) => {
        expect(res.text).toMatchSnapshot();
      });
  });

  it('should reply /halo command with the correct WhatsApp message', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        ProfileName: 'Amir',
        Body: '/halo',
      })
      .expect(200)
      .expect((res) => {
        expect(res.text).toMatchSnapshot();
      });
  });

  it('should reply /help command with the correct WhatsApp message', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        ProfileName: 'Amir',
        Body: '/help',
      })
      .expect(200)
      .expect((res) => {
        expect(res.text).toMatchSnapshot();
      });
  });

  it('should reply /nasional command with the correct WhatsApp message', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        ProfileName: 'Amir',
        Body: '/nasional',
      })
      .expect(200)
      .expect((res) => {
        expect(res.text).toMatchSnapshot();
      });
  });
});
