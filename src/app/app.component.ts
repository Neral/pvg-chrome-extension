import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadData();
  }

  // TODO: create separate service for all endpoints
  loadData() {
    return this.http.get('https://www.google.com/maps/timeline/_rpc/ma?pb=').subscribe(data => {
      console.log(data);
    });
  }
}
