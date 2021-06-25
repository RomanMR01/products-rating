import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../environments/environment';
import * as optimizelySDK from '@optimizely/optimizely-sdk';

class Toggle {
  code: string;
  state: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'products-rating';
  toggleName = 'stars.rating';
  stateON = 'ON';
  ratingEnabled = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    if (environment.webService) {
      const toggle = this.http.get('http://localhost:8081/feature-toggle/v1/' + this.toggleName);
      toggle.subscribe((data: Toggle) => {
        console.log('Response:' + JSON.stringify(data));
        this.ratingEnabled = (this.stateON === data.state.valueOf());
      });
    } else if (environment.optimizely) {
      const optimizelyClientInstance = optimizelySDK.createInstance({
        sdkKey: '<key>'
      });
      optimizelyClientInstance.onReady().then(() => {
        const enabled = optimizelyClientInstance.isFeatureEnabled('stars_rating', 'testU');
        console.log('Is enabled:' + enabled);
        this.ratingEnabled = enabled;
      });
    }
  }
}
