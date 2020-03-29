import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private httpClient: HttpClient) { }

  fetchTimeline(): Observable<any> {
    return this.httpClient.get('https://www.google.com/maps/timeline/_rpc/ma?pb=!1m2!3m1!1s2020');
  }
}
