import { Component, Output, EventEmitter } from '@angular/core';
import { Questionaire } from '../models/questionaire';
import { QuestionnaireDialogComponent } from '../questionnaire-dialog/questionnaire-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { InformationType } from '../constants';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent {

  @Output() questionaireSubmit: EventEmitter<Questionaire> = new EventEmitter();
  informationType = InformationType.Introduction;

  constructor(public dialog: MatDialog) { }

  openQuestionaireDialog(): void {
    const data: Questionaire = new Questionaire(null, null, false);
    const dialogRef: MatDialogRef<QuestionnaireDialogComponent, any> = this.dialog.open(QuestionnaireDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe((result: Questionaire) => {
      if (result.isOfficialTest) {
        this.questionaireSubmit.emit(result);
      } else {
        console.log('Data is not submitted because Test is not official'); // TODO: show msg for hackers
      }
    });
  }

  openTimelineForCheck() {
    this.questionaireSubmit.emit(null);
  }
}
