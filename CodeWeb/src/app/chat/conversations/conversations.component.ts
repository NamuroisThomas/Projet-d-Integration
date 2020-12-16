import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { DatePipe } from '@angular/common';
import {GetListeDemandeService} from '../../liste-demande/liste-demande.service';
import {concat} from 'rxjs';

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
  profil: any;
  listeDemande: any;
  allListe: Array<any>;
  nomPrenom: string;
  idDemande ='';


  constructor(private route: ActivatedRoute, private router: Router, public datepipe: DatePipe, private api: GetListeDemandeService) {
    this.phoneNumber = localStorage.getItem('phoneNumber');
    firebase.database().ref(this.path).on('value', resp => {
      this.contacts = [];
      this.contacts = snapshotToArray(resp);
      this.isLoadingResults = false;
      console.log('path:', this.path);
    });
  }

  ngOnInit(): void {
    this.profil = JSON.parse(localStorage.getItem('user'));
    this.api.listeDemandeCall().subscribe((res) => {
      this.listeDemande = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeAllCall().subscribe((res) => {
      this.allListe = res[Object.keys(res)[2]];
    });
    this.nomPrenom = this.profil.nomUtilisateur + ' ' + this.profil.prenomUtilisateur;
  }



  // enterChatRoom(contactname: string) {

    // console.log('cn:', contactname);
    // const chat = { contactname: '', phoneNumber: '', message: '', date: '', type: '' };
    // chat.contactname = contactname;
    // chat.phoneNumber = this.phoneNumber;
    // chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    // // chat.message = `${this.phoneNumber} enter the room`;
    // chat.type = 'join';
    // const newMessage = firebase.database().ref('chats/').push();
    // newMessage.set(chat);
    //
    // firebase.database().ref('roomusers/').orderByChild('contactname').equalTo(contactname).on('value', (resp: any) => {
    //   let roomuser = [];
    //   roomuser = snapshotToArray(resp);
    //   const user = roomuser.find(x => x.phoneNumber === this.phoneNumber);
    //   if (user !== undefined) {
    //     const userRef = firebase.database().ref('roomusers/' + user.key);
    //     userRef.update({status: 'online'});
    //   } else {
    //     const newroomuser = { contactname: '', phoneNumber: '', status: '' };
    //     newroomuser.contactname = contactname;
    //     newroomuser.phoneNumber = this.phoneNumber;
    //     newroomuser.status = 'online';
    //     const newRoomUser = firebase.database().ref('roomusers/').push();
    //     newRoomUser.set(newroomuser);
    //
    //   }
    // });

  //   this.router.navigate(['/chatroom', this.phoneNumber, contactname]);
  //
  // }

  deleteContact(contactname: string){
    console.log(contactname);
    const deleteRef = firebase.database().ref('users/' + this.phoneNumber + '/contacts/') ;
    console.log('users/' + this.phoneNumber + '/contacts/' + contactname);
    console.log(deleteRef.key);
    deleteRef.remove();
  }
  enterRoom(idDemande){
    console.log(idDemande);
    const chatRoom = firebase.database().ref(idDemande + '/user/').push();
    chatRoom.set(this.phoneNumber);
    this.idDemande = idDemande;
    this.router.navigate(['/chatroom', this.phoneNumber, ('idDemande').concat(idDemande)]);
  }
  logout(): void {
    localStorage.removeItem('phoneNumber');
    this.router.navigate(['/chat']);
  }
}
