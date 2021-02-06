import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vanin';

  constructor(private http: HttpClient) {}

  ngOnInit() {

    // this.http.get("/.netlify/functions/hello").pipe().subscribe(i => console.log(i));

    // this.http.get("/.netlify/functions/participants").pipe().subscribe(i => console.log(i));

    // this.http.get("http://localhost:8888/.netlify/functions/participants").pipe().subscribe(i => console.log(i));

    // this.http.get("/.netlify/functions/files").pipe().subscribe(i => console.log(i));

  //   this.http.get("http://localhost:5001/vanin2/us-central1/helloWorld").pipe()
  //     .subscribe(i => console.log(7777, i));

  }
}
