import {Observable} from 'rxjs';

export interface ToggleService {
  isFeatureEnabled(code: string): Observable<boolean>;
}
