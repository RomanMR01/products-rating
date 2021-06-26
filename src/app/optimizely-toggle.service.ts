import {ToggleService} from './toggle.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as optimizelySDK from '@optimizely/optimizely-sdk';

@Injectable({
  providedIn: 'root'
})
export class OptimizelyToggleService implements ToggleService {
  private testUser = 'user';
  private optimizelyClientInstance = optimizelySDK.createInstance({
    sdkKey: '<api-key>'
  });

  isFeatureEnabled(code: string): Observable<boolean> {
    return new Observable<boolean>(ob => {
      this.optimizelyClientInstance.onReady().then(() => {
        const enabled = this.optimizelyClientInstance.isFeatureEnabled('stars_rating', this.testUser);
        console.log('Is enabled:' + enabled);
        ob.next(enabled);
      });
    });
  }
}
