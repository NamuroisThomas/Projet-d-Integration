import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactService} from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  FormData: FormGroup;

  constructor(private builder: FormBuilder, private contact: ContactService) {

  }

  ngOnInit() {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Comment: new FormControl('', [Validators.required]),
      recaptchaReactive: new FormControl(null, [Validators.required])
    });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  onSubmit(FormData) {
    console.log(FormData)
    const donnee = JSON.parse('{ "nom":"' + FormData.Fullname + '", "email":"' + FormData.Email + '", "commentaire":"' + FormData.Comment + '"}')
        this.contact.PostMessage(donnee)
          .subscribe(response => {
            location.href = 'https://mailthis.to/confirm'
            console.log(response)
          }, error => {
            console.warn(error.responseText)
            console.log({ error })
          })
  }
}
