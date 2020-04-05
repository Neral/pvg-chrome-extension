import { Component, OnInit, Input } from '@angular/core';
import { TransformationType, Direction } from 'angular-coordinates';
import { ResultsData } from '../models/resultsData';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() results: ResultsData[];

  transformationType;
  direction;

  totalScore: number;

  constructor() {
    this.transformationType = TransformationType;
    this.direction = Direction;
  }

  ngOnInit() {
    this.totalScore = 0;
    this.results.forEach(
      el => this.totalScore += el.score
    );
    this.results.sort((a, b) => 0 - (a.score > b.score ? 1 : -1));
  }
  // TODO: remove empty onInits, scss
  navigate() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.update(tabs[0].id, { url: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019' });
    });
  }

}
