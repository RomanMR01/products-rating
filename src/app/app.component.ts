import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

class Toggle {
  code: string;
  state: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'products-rating';
  toggleName = 'stars.rating';
  stateON = 'ON';
  ratingEnabled = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const toggle = this.http.get('http://localhost:8081/feature-toggle/v1/' + this.toggleName);
    toggle.subscribe((data: Toggle) => {
      console.log('Response:' + JSON.stringify(data));
      this.ratingEnabled = (this.stateON === data.state.valueOf());
    });
  }
}
