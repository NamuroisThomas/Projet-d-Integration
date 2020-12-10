import { Component } from '@angular/core';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDdE8dV4XP4LRawq64d7HKxVg53Qxnb_v0',
  authDomain: 'chat-pi-e66d4.firebaseapp.com',
  databaseURL: 'https://chat-pi-e66d4-default-rtdb.firebaseio.com',
  projectId: 'chat-pi-e66d4',
  storageBucket: 'chat-pi-e66d4.appspot.com',
  messagingSenderId: '547438587537',
  appId: '1:547438587537:web:025d0cd028a4abc1b41930'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CodeWeb';
  constructor() {
    firebase.initializeApp(config);
  }

}
