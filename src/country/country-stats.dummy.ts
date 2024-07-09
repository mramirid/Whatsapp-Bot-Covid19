import type CountryStats from './country-stats.interface';

const dummyCountryStats: CountryStats = {
  cases: 131_524_885,
  todayCases: 45_442_552,
  deaths: 3_352_999,
  todayDeaths: 823_993,
  recovered: 90_332,
  todayRecovered: 7223,
  active: 583,
  critical: 2,
  updatedAt: new Date('2023-05-14T01:24:30.408Z'),
};

export default dummyCountryStats;
