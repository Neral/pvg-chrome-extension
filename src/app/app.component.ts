import { Component, OnInit } from '@angular/core';
import { ResultsData } from './models/resultsData';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showResults: boolean;
  showTimeline: boolean;
  isSubmitSuccess: boolean;
  eventResults: ResultsData[];

  faHeart = faHeart;

  openResults(results: ResultsData[]): void {
    this.showResults = true;
    this.eventResults = results;
  }

  showThankYou(isSubmitSuccess: boolean): void {
    this.isSubmitSuccess = isSubmitSuccess;
  }
}

