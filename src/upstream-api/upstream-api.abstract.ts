import type { Observable } from 'rxjs';

import type CountryStats from '../country/country-stats.interface';

export default abstract class UpstreamAPI {
  abstract getCountryStats(): Observable<CountryStats>;
}
