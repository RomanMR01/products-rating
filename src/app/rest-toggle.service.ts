import {ToggleService} from './toggle.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

class Toggle {
  code: string;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RestToggleService implements ToggleService {
  toggleName = 'stars.rating';

  constructor(private http: HttpClient) {
  }

  isFeatureEnabled(code: string): Observable<boolean> {
    const toggle = this.http.get('http://localhost:8081/feature-toggle/v1/' + this.toggleName);
    return toggle.pipe(map((tg: Toggle) => tg.enabled));
  }
}
