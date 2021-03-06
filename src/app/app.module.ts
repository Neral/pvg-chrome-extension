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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ResultsComponent } from './results/results.component';
import { InformationComponent } from './information/information.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { StartpageComponent } from './startpage/startpage.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { HeaderComponent } from './header/header.component';
import { MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    PlaceDialogComponent,
    QuestionnaireDialogComponent,
    ResultsComponent,
    InformationComponent,
    StartpageComponent,
    MapDialogComponent,
    HeaderComponent
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
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [PlaceDialogComponent, QuestionnaireDialogComponent, MapDialogComponent],

})
export class AppModule { }
