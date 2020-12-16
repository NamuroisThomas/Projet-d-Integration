import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { DatePipe } from '@angular/common';

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  phoneNumber = '';
  displayedColumns: string[] = ['contactname'];
  contacts = [];
  isLoadingResults = true;
  path = ('users/').concat(localStorage.getItem('phoneNumber')).concat('/contacts/');


  constructor(private route: ActivatedRoute, private router: Router, public datepipe: DatePipe) {
    this.phoneNumber = localStorage.getItem('phoneNumber');
    firebase.database().ref(this.path).on('value', resp => {
      this.contacts = [];
      this.contacts = snapshotToArray(resp);
      this.isLoadingResults = false;
      console.log('path:', this.path);
    });
  }

  ngOnInit(): void {
  }

  enterChatRoom(contactname: string) {

    console.log('cn:', contactname);
    const chat = { contactname: '', phoneNumber: '', message: '', date: '', type: '' };
    chat.contactname = contactname;
    chat.phoneNumber = this.phoneNumber;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    // chat.message = `${this.phoneNumber} enter the room`;
    chat.type = 'join';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);

    firebase.database().ref('roomusers/').orderByChild('contactname').equalTo(contactname).on('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.phoneNumber === this.phoneNumber);
      if (user !== undefined) {
        const userRef = firebase.database().ref('roomusers/' + user.key);
        userRef.update({status: 'online'});
      } else {
        const newroomuser = { contactname: '', phoneNumber: '', status: '' };
        newroomuser.contactname = contactname;
        newroomuser.phoneNumber = this.phoneNumber;
        newroomuser.status = 'online';
        const newRoomUser = firebase.database().ref('roomusers/').push();
        newRoomUser.set(newroomuser);
      }
    });

    this.router.navigate(['/chatroom', this.phoneNumber, contactname]);

  }

  logout(): void {
    localStorage.removeItem('phoneNumber');
    this.router.navigate(['/chat']);
  }
}
