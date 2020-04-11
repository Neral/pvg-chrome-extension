import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from '../models/location';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit {
  mapUrl: SafeResourceUrl;
  loaded: boolean;
  loadEventsCount = 0;
  height = 0;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Location, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${this.data.latitude},${this.data.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`);
  }

  close(): void {
    this.dialogRef.close();
  }

  handleLoad() {
    if (this.loadEventsCount > 0) {
      this.loaded = true;
      this.height = 300;
    }

    this.loadEventsCount++;
  }


}
