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

  nickname = '';
  displayedColumns: string[] = ['contactname'];
  contacts = [];
  isLoadingResults = true;


  constructor(private route: ActivatedRoute, private router: Router, public datepipe: DatePipe) {
    this.nickname = localStorage.getItem('nickname');
    firebase.database().ref('contacts/').on('value', resp => {
      this.contacts = [];
      this.contacts = snapshotToArray(resp);
      this.isLoadingResults = false;
    });
  }

  ngOnInit(): void {
  }

  enterChatRoom(contactname: string) {

    console.log('cn:', contactname);
    const chat = { contactname: '', nickname: '', message: '', date: '', type: '' };
    chat.contactname = contactname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.message = `${this.nickname} enter the room`;
    chat.type = 'join';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);

    firebase.database().ref('roomusers/').orderByChild('contactname').equalTo(contactname).on('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.nickname === this.nickname);
      if (user !== undefined) {
        const userRef = firebase.database().ref('roomusers/' + user.key);
        userRef.update({status: 'online'});
      } else {
        const newroomuser = { contactname: '', nickname: '', status: '' };
        newroomuser.contactname = contactname;
        newroomuser.nickname = this.nickname;
        newroomuser.status = 'online';
        const newRoomUser = firebase.database().ref('roomusers/').push();
        newRoomUser.set(newroomuser);
      }
    });

    this.router.navigate(['/chatroom', this.nickname, contactname]);
    console.log(this.nickname, contactname);

  }

  logout(): void {
    localStorage.removeItem('nickname');
    this.router.navigate(['/chat']);
  }
}
