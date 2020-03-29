import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Place, UserFormPlace } from '../models/place';
import { TransformationType, Direction } from 'angular-coordinates';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { PlaceDialogComponent } from '../place-dialog/place-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  interestLocations: Place[] = new Array();
  faPlus = faPlus;

  transformationType;
  direction;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.transformationType = TransformationType;
    this.direction = Direction;
  }

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
    const weeksBack = 3;	// In weeks
    const minLocDuration = 10 * 60; // In minutes
    const timeFromLocations = moment().subtract(weeksBack, 'week').valueOf();

    for (const loc of data[0][0]) {
      const place = new Place(loc[0], loc[13], loc[1][2], loc[1][3]);
      if (place.timeFrom < timeFromLocations) { continue; }
      if (place.timeTo - place.timeFrom < minLocDuration * 1000) { continue; }
      this.interestLocations.push(place);
    }

    for (const loc of this.interestLocations) {
      console.log(loc);
    }
  }

  addPlace(): void {
    const data = new UserFormPlace(null, null, null);
    this.openDialog(data);
  }
  // TODO: add possibility to remove
  // TODO: fix format, that in calendar would be marked
  updatePlace(place: Place): void {
    console.log(moment(place.timeFrom).format('D/MM/YYYY, HH:mm A'));
    const data = new UserFormPlace([place.timeFrom, place.timeTo], place.latitude, place.longitude);
    const index = this.interestLocations.indexOf(place);
    this.openDialog(data, index);
  }

  openDialog(data: UserFormPlace | Place, updateIndex?: number) {
    const dialogRef = this.dialog.open(PlaceDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      const from = new Date(result.timeRange[0]).getTime();
      const to = new Date(result.timeRange[1]).getTime();
      const place = new Place(from, to, result.latitude, result.longitude);

      if (updateIndex) {
        this.interestLocations[updateIndex] = place;
      } else {
        this.interestLocations.push(place);
      }
    });
  }

}
