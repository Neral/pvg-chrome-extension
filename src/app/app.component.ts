import { Component, OnInit } from '@angular/core';
import { ResultsData } from './models/resultsData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showResults: boolean;
  showTimeline: boolean;
  eventResults: ResultsData[];

  openResults(results: ResultsData[]): void {
    this.showResults = true;
    this.eventResults = results;
    console.log(results);
  }
}

