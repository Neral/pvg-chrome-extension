import { Component, OnInit } from '@angular/core';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationForm } from '../models/location';
import { FormBuilder, Validators } from '@angular/forms';
import { timeRangeValidator } from '../shared/time-range.directive';
import { latitudeValidator } from '../shared/latitude.directive';
import { longitudeValidator } from '../shared/longitude.directive';

@Component({
  selector: 'app-place-dialog',
  templateUrl: './place-dialog.component.html',
  styleUrls: ['./place-dialog.component.scss']
})
export class PlaceDialogComponent implements OnInit {

  placeForm = this.fb.group({
    timeRange: ['', [
      Validators.required,
      timeRangeValidator()
    ]],
    latitude: ['', [Validators.required,
    Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
    latitudeValidator()
    ]],
    longitude: ['', [Validators.required,
    Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
    longitudeValidator()
    ]]
  });

  constructor(
    public dialogRef: MatDialogRef<PlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocationForm, private fb: FormBuilder) { }

  ngOnInit() {
    this.placeForm.setValue({
      timeRange: this.data.timeRange,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
    });
  }

  cancel(): void {
    console.log(this.data.timeRange);
    console.log(this.data.timeRange[0]);
    console.log(this.data.timeRange[1]);
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.placeForm.value.timeRange);
    const formData: LocationForm = this.placeForm.value;
    this.dialogRef.close(formData);
  }

  get timeRange() { return this.placeForm.get('timeRange'); }
  get latitude() { return this.placeForm.get('latitude'); }
  get longitude() { return this.placeForm.get('longitude'); }

}
