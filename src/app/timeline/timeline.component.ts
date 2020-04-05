import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import { Location, LocationForm } from '../models/location';
import { TransformationType, Direction } from 'angular-coordinates';
import { faPlus, faTrash, faEdit, faHeart, faEye } from '@fortawesome/free-solid-svg-icons';

import { PlaceDialogComponent } from '../place-dialog/place-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TimelineService } from '../services/timeline.service';
import { PositiveTestData } from '../models/positiveTestData';
import { ResultsData } from '../models/resultsData';
import { LocationsService } from '../services/locations.service';
import { Questionaire } from '../models/questionaire';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  interestLocations: Location[] = new Array();
  isBusy: boolean;
  isTimelineExist: boolean;
  isError: boolean;

  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faHeart = faHeart;
  faEye = faEye;

  transformationType;
  direction;

  @Input() questionaire: Questionaire;
  @Output() testedPositiveDataSubmit: EventEmitter<boolean> = new EventEmitter();
  @Output() checkDataSubmit: EventEmitter<ResultsData[]> = new EventEmitter();

  constructor(private timelineService: TimelineService, private locationsService: LocationsService, public dialog: MatDialog) {
    this.transformationType = TransformationType;
    this.direction = Direction;
  }

  ngOnInit(): void {
    this.isBusy = true;
    this.isError = false;
    this.timelineService.fetchTimeline().subscribe(data => {
      this.filterData(data);
    },
      () => {
        this.isError = true;
        this.isBusy = false;
      });
  }

  filterData(data): void {
    const weeksBack = 3;	// In weeks
    const minLocDuration = 10 * 60; // In minutes
    const latestMoment = this.questionaire ? moment(this.questionaire.time) : moment();
    const validTimeTo = latestMoment.valueOf();
    const validTimeFrom = latestMoment.subtract(weeksBack, 'week').valueOf();
    for (const dataset of data[0][0]) {
      const location: Location = {
        from: dataset[0],
        to: dataset[13],
        lat: dataset[1][2],
        lon: dataset[1][3]
      };
      // TODO: think should we need to include last day, now it is not
      if (location.from < validTimeFrom || location.to > validTimeTo) { continue; }
      if (location.to - location.from < minLocDuration * 1000) { continue; }
      this.interestLocations.push(location);
    }

    if (this.interestLocations.length > 0) {
      this.isBusy = false;
      this.isTimelineExist = true;
    } else {
      this.isBusy = false;
      this.isTimelineExist = true;
    }
  }

  add(): void {
    const data = new LocationForm(null, null, null);
    this.openDialog(data);
  }

  update(loc: Location): void {
    const data = new LocationForm([new Date(loc.from), new Date(loc.to)], loc.lat, loc.lon);
    const index = this.interestLocations.indexOf(loc);
    this.openDialog(data, index);
  }

  viewMap(loc: Location): void {
    this.dialog.open(MapDialogComponent, {
      width: '500px',
      height: '390px',
      data: loc
    });
  }

  remove(loc: Location): void {
    const index = this.interestLocations.indexOf(loc);
    this.interestLocations.splice(index, 1);
  }

  openDialog(data: LocationForm | Location, updateIndex?: number): void {
    const dialogRef: MatDialogRef<PlaceDialogComponent, any> = this.dialog.open(PlaceDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      const from: number = new Date(result.timeRange[0]).getTime();
      const to: number = new Date(result.timeRange[1]).getTime();
      const location: Location = { from, to, lat: result.latitude, lon: result.longitude };

      if (updateIndex) {
        this.interestLocations[updateIndex] = location;
      } else {
        this.interestLocations.push(location);
      }
    });
  }

  submitPositiveTestData(): void {
    const formattedFestDate = new Date(this.questionaire.time).getTime();
    const positiveTestData: PositiveTestData = new PositiveTestData(this.questionaire.email, formattedFestDate, this.interestLocations);

    this.locationsService.submitData(positiveTestData).subscribe(data => {
      // TODO: think to add some more results as well
      this.testedPositiveDataSubmit.emit();
    });
  }

  checkData(): void {
    this.locationsService.calculateResults({ locations: this.interestLocations }).subscribe(data => {
      this.checkDataSubmit.emit(data);
    });
  }

}
