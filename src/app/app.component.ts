import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular To Do List';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBqxVw8xjk2fUScgX5eFlTScKJhh87K0Sw",
      authDomain: "ng-to-do-6526f"
    });
  }
}
