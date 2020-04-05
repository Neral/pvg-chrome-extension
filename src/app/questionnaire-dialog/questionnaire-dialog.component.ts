import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Questionaire } from '../models/questionaire';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
  styleUrls: ['./questionnaire-dialog.component.scss']
})
export class QuestionnaireDialogComponent implements OnInit {

  questionaireForm = this.fb.group({
    isOfficialTest: ['', [
      Validators.requiredTrue,
    ]],
    positiveTestDate: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]],
  });

  constructor(
    public dialogRef: MatDialogRef<QuestionnaireDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Questionaire, private fb: FormBuilder) { }
  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const formData: Questionaire = this.questionaireForm.value;
    this.dialogRef.close(formData);
  }

  get email() { return this.questionaireForm.get('email'); }
  get positiveTestDate() { return this.questionaireForm.get('positiveTestDate'); }
  get isOfficialTest() { return this.questionaireForm.get('isOfficialTest'); }

}
