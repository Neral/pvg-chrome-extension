import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Location, LocationForm } from '../models/location';
import { TransformationType, Direction } from 'angular-coordinates';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { PlaceDialogComponent } from '../place-dialog/place-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TimelineService } from '../services/timeline.service';
import { Questionaire } from '../models/questionaire';
import { QuestionnaireDialogComponent } from '../questionnaire-dialog/questionnaire-dialog.component';
import { PositiveTestData } from '../models/positiveTestData';
import { ResultsData } from '../models/resultsData';
import { LocationsService } from '../services/locations.service';


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

  transformationType;
  direction;

  @Output() showResults: EventEmitter<ResultsData[]> = new EventEmitter();

  constructor(private timelineService: TimelineService, private locationsService: LocationsService, public dialog: MatDialog) {
    this.transformationType = TransformationType;
    this.direction = Direction;
  }

  ngOnInit(): void {
    this.isBusy = true;
    this.timelineService.fetchTimeline().subscribe(data => {
      console.log('data is fetched');
      this.filterData(data);
    },
      () => this.isError = true);
  }

  filterData(data): void {
    const weeksBack = 3;	// In weeks
    const minLocDuration = 10 * 60; // In minutes
    const timeFromLocations = moment().subtract(weeksBack, 'week').valueOf();
    for (const dataset of data[0][0]) {
      const location: Location = {
        from: dataset[0],
        to: dataset[13],
        lat: dataset[1][2],
        lon: dataset[1][3]
      };
      if (location.from < timeFromLocations) { continue; }
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
  // TODO: fix format, that in calendar would be marked
  update(loc: Location): void {
    console.log(moment(loc.from).format('D/MM/YYYY, HH:mm A'));
    const data = new LocationForm([loc.from, loc.to], loc.lat, loc.lon);
    const index = this.interestLocations.indexOf(loc);
    this.openDialog(data, index);
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
  // TODO: think to create general
  openQuestionaireDialog(): void {
    const data: Questionaire = new Questionaire(null, null, false);
    const dialogRef: MatDialogRef<QuestionnaireDialogComponent, any> = this.dialog.open(QuestionnaireDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe((result: Questionaire) => {
      console.log(result);
      if (result.isOfficialTest) {
        const testDate = new Date(result.time).getTime();
        const positiveTestData: PositiveTestData = new PositiveTestData(result.email, testDate, this.interestLocations);
        this.submitPositiveTestData(positiveTestData);
        console.log('submit');
        // TODO: remove all console.logs
      } else {
        console.log('Data is not submitted');
      }
    });
  }

  submitPositiveTestData(positiveTestData: PositiveTestData): void {
    this.locationsService.submitData(positiveTestData).subscribe(data => {
      console.log('submit success', data);
    });
  }

  checkLocations(): void {
    const resultsMock: ResultsData[] = [{ from: 1584576000000, to: 1584662400000, lat: 36.7758493, lon: -119.7181083, score: 80 },
    { from: 1584976820000, to: 1585008000000, lat: 54.8268066, lon: 24.9463829, score: 0 },
    { from: 1585008000000, to: 1585087200000, lat: 0, lon: 180, score: 20 },
    { from: 1585087260000, to: 1585094400000, lat: 51.081083, lon: -114.1294214999999, score: 4 },
    { from: 1585324800000, to: 1585326307000, lat: 23.3812399, lon: 86.246775, score: 830 },
    { from: 1585333196000, to: 1585400781000, lat: -3.9736393, lon: 122.52313079999998, score: 10 }
    ];

    this.showResults.emit(resultsMock);
    // TODO: enable backend post
    // this.locationsService.calculateResults({ locations: this.interestLocations }).subscribe(data => {
    //   this.showResults.emit(data);
    // });
  }

}
