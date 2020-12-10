import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-ajout-contact',
  templateUrl: './ajout-contact.component.html',
  styleUrls: ['./ajout-contact.component.scss']
})
export class AjoutContactComponent implements OnInit {
  contactForm: FormGroup;
  nickname = '';
  contactname = '';
  ref = firebase.database().ref('contacts/');
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      'contactname' : [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const contact = form;
    this.ref.orderByChild('contactname').equalTo(contact.contactname).once('value', (snapshot: any) => {
      if (snapshot.exists()) {
        console.log('contactAlreadyExists');
      } else {
        const newContact = firebase.database().ref('contacts/').push();
        newContact.set(contact);
        this.router.navigate(['/conversations']);
      }
    });
  }

}
