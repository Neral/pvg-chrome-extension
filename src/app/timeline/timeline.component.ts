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
    this.timelineService.fetchTimeline().subscribe(data => {
      console.log('data is fetched');
      this.filterData(data);
    });
  }

  filterData(data): void {
    const weeksBack = 3;	// In weeks
    const minLocDuration = 10 * 60; // In minutes
    const timeFromLocations = moment().subtract(weeksBack, 'week').valueOf();
    // TODO: rename
    for (const loc of data[0][0]) {
      const location: Location = {
        from: loc[0],
        to: loc[13],
        lat: loc[1][2],
        lon: loc[1][3]
      };
      if (location.from < timeFromLocations) { continue; }
      if (location.to - location.from < minLocDuration * 1000) { continue; }
      this.interestLocations.push(location);
    }
  }

  add(): void {
    const data = new LocationForm(null, null, null);
    this.openDialog(data);
  }
  // TODO: add possibility to remove
  // TODO: fix format, that in calendar would be marked
  // 
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
    this.locationsService.calculateResults({ locations: this.interestLocations }).subscribe(data => {
      this.showResults.emit(data);
    });
  }

}
