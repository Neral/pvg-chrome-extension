import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { PositiveTestData } from '../models/positiveTestData';
import { ResultsCalculationData } from '../models/resultsData';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private httpClient: HttpClient) { }

  submitData(data: PositiveTestData): Observable<any> {
    return this.httpClient.post('http://privacy-vs-germs.us-east-2.elasticbeanstalk.com/locations/add', data).pipe(
      catchError(this.errorHandler)
    );
  }

  calculateResults(data: ResultsCalculationData): Observable<any> {
    return this.httpClient.post('http://privacy-vs-germs.us-east-2.elasticbeanstalk.com/locations/calculate-scores', data).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(): Observable<string> {
    return throwError('Sorry, our services does not work right now, please try that later');
  }
}
