import { Component, OnInit, Input } from '@angular/core';
import { InformationType } from '../constants';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  @Input() informationType: typeof InformationType;
  informationTypeConstants = InformationType;

  constructor() { }

  ngOnInit() {
    console.log(this.informationType);
  }

}
