import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoordinatesModule } from 'angular-coordinates';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PlaceDialogComponent } from './place-dialog/place-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule
} from 'ng-pick-datetime';
import { QuestionnaireDialogComponent } from './questionnaire-dialog/questionnaire-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    PlaceDialogComponent,
    QuestionnaireDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    CoordinatesModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [PlaceDialogComponent, QuestionnaireDialogComponent],

})
export class AppModule { }
