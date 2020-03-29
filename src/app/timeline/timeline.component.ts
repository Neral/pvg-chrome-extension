import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IPlace, UserFormPlace, PlaceTime, PlaceCoords } from '../models/place';
import { TransformationType, Direction } from 'angular-coordinates';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { PlaceDialogComponent } from '../place-dialog/place-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TimelineService } from '../services/timeline.service';
import { PlacesService } from '../services/places.service';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  interestLocations: IPlace[] = new Array();
  faPlus = faPlus;

  transformationType;
  direction;

  constructor(private timelineService: TimelineService, private placesService: PlacesService, public dialog: MatDialog) {
    this.transformationType = TransformationType;
    this.direction = Direction;
  }

  ngOnInit(): void {
    this.timelineService.fetchTimeline().subscribe(data => {
      console.log('data is fetched');
      this.filterData(data);
    });
  }

  filterData(data): void {
    const weeksBack = 3;	// In weeks
    const minLocDuration = 10 * 60; // In minutes
    const timeFromLocations = moment().subtract(weeksBack, 'week').valueOf();

    for (const loc of data[0][0]) {
      const place: IPlace = {
        time: {
          from: loc[0],
          to: loc[13]
        },
        coords: {
          lat: loc[1][2],
          lon: loc[1][3]
        }
      };
      if (place.time.from < timeFromLocations) { continue; }
      if (place.time.to - place.time.from < minLocDuration * 1000) { continue; }
      this.interestLocations.push(place);
    }
  }

  addPlace(): void {
    const data = new UserFormPlace(null, null, null);
    this.openDialog(data);
  }
  // TODO: add possibility to remove
  // TODO: fix format, that in calendar would be marked
  updatePlace(place: IPlace): void {
    console.log(moment(place.time.from).format('D/MM/YYYY, HH:mm A'));
    const data = new UserFormPlace([place.time.from, place.time.to], place.coords.lat, place.coords.lon);
    const index = this.interestLocations.indexOf(place);
    this.openDialog(data, index);
  }

  openDialog(data: UserFormPlace | IPlace, updateIndex?: number): void {
    const dialogRef: MatDialogRef<PlaceDialogComponent, any> = this.dialog.open(PlaceDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      const from: number = new Date(result.timeRange[0]).getTime();
      const to: number = new Date(result.timeRange[1]).getTime();
      const time: PlaceTime = { from, to };
      const coords: PlaceCoords = {
        lat: result.latitude,
        lon: result.longitude
      };
      const place: IPlace = { time, coords };

      if (updateIndex) {
        this.interestLocations[updateIndex] = place;
      } else {
        this.interestLocations.push(place);
      }
    });
  }

  submitTestedPositivePlaces(): void {
    this.placesService.submitPlaces(this.interestLocations).subscribe(data => {
      console.log('submit success', data);
    });
  }

}
