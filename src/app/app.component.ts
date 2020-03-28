import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Place } from './models/place';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadData();
  }

  // TODO: create separate service for all endpoints
  loadData() {
    return this.http.get('https://www.google.com/maps/timeline/_rpc/ma?pb=').subscribe(data => {
      console.log('data is fetched');
      this.filterData(data);
    });
  }

  filterData(data) {
    const interestLocations: Place[] = new Array();
    const weeksBack = 3;	// In weeks
    const minLocDuration = 10 * 60; // In minutes
    const timeFromLocations = moment().subtract(weeksBack, 'week').valueOf();

    for (const loc of data[0][0]) {
      const place = new Place(loc[0], loc[13], loc[1][2], loc[1][3]);
      if (place.timeFrom < timeFromLocations) { continue; }
      if (place.timeTo - place.timeFrom < minLocDuration * 1000) { continue; }
      interestLocations.push(place);
    }

    for (const loc of interestLocations) {
      console.log(loc);
    }
  }
}
