import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToggleService} from './toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'products-rating';
  toggleName = 'stars.rating';
  ratingEnabled = false;

  constructor(private http: HttpClient, @Inject('toggleService') private toggleService: ToggleService) {
  }

  ngOnInit(): void {
    this.toggleService.isFeatureEnabled(this.toggleName).subscribe(enabled => {
      this.ratingEnabled = enabled;
    });
  }
}
