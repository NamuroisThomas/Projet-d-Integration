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
  phoneNumber = '';
  contactname = '';
  matcher = new MyErrorStateMatcher();
  phone = localStorage.getItem('phoneNumber');
  stock = ('users/').concat(this.phone.concat( '/contacts/'));
  ref = firebase.database().ref(this.stock);



  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      'contactname' : [null, Validators.required]
    });
    console.log('stock', this.stock);
    console.log(this.phone);
  }


  onFormSubmit(form: any) {

    const contact = form;
    this.ref.orderByChild('contactname').equalTo(contact.contactname).once('value', (snapshot: any) => {
      if (snapshot.exists()) {
        console.log('contactAlreadyExists');
      } else {
        const newContact = firebase.database().ref(('users/' + this.phone + '/contacts/')).push();
        newContact.set(contact);

        this.router.navigate(['/conversations/', this.phone]);
      }
    });
  }

}
//TODO quand ajou d'un contact, créer un chat commun et s'ajouter chez le contact
// TODO Modifier les push dans firebase avec des + pour supp les va


