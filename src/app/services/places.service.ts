import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPlace } from '../models/place';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private httpClient: HttpClient) { }

  submitPlaces(places: IPlace[]): Observable<any> {
    return this.httpClient.post('http://privacy-vs-germs.us-east-2.elasticbeanstalk.com/locations', places).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(): Observable<string> {
    return throwError('Sorry, our services does not work right now, please try that later');
  }
}
