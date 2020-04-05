import { Component, OnInit } from '@angular/core';
import { ResultsData } from './models/resultsData';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Questionaire } from './models/questionaire';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showResults: boolean;
  showTimeline: boolean;
  showThankYou: boolean;
  eventResults: ResultsData[];

  testedPositiveQuestionaire: Questionaire;

  faHeart = faHeart;

  handleCheckDataSubmit(results: ResultsData[]): void {
    this.showResults = true;
    this.showTimeline = false;
    this.eventResults = results;
  }

  handleTestedPositiveDataSubmit(): void {
    this.showThankYou = true;
    this.showTimeline = false;
  }

  openTimeline(testedPositiveQuestionaire: Questionaire) {
    this.testedPositiveQuestionaire = testedPositiveQuestionaire;
    this.showTimeline = true;
    // this.isTestedPositive = !!questionaireData; // sita daryti timeline viduje
    // hide everything, show timeline, pass time
    // this.questionaireData

  }
}

