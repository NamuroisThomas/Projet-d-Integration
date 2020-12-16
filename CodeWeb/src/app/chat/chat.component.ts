import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase';
import {GetListeDemandeService} from "../liste-demande/liste-demande.service";
import {HttpClient} from "@angular/common/http";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  loginForm: FormGroup;
  phoneNumber = '';
  user = ('users/').concat(this.phoneNumber);
  ref = firebase.database().ref(this.user);
  matcher = new MyErrorStateMatcher();
  profil = '';

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (localStorage.getItem('phoneNumber')) {
      this.router.navigate(['/conversations/', this.phoneNumber]);
    }
    this.loginForm = this.formBuilder.group({
      'phoneNumber' : [null, Validators.required]
    });
  }
  onFormSubmit(form: any) {
    console.log(this.phoneNumber);
    const login = form;
    this.ref.orderByChild('phoneNumber').equalTo(login.phoneNumber).once('value', snapshot => {
      if (snapshot.exists()) {
        localStorage.setItem('phoneNumber', login.phoneNumber);
        this.router.navigate(['/conversations', login.phoneNumber]);
      } else {
        const newUser = firebase.database().ref(this.user).push();
        newUser.set(login);
        localStorage.setItem('phoneNumber', login.phoneNumber);
        this.router.navigate(['/conversations/', this.phoneNumber]);
      }

    });
  }
}
