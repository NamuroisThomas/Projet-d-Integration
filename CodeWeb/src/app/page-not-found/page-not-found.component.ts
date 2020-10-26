import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {


  public contact: FormGroup;
  public errorMessage: string;

  public formContact = new FormGroup({
    Title: new FormControl(null),
    Description: new FormControl(null)
  })

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router
  ) { }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.contact = this.formBuilder.group({
      nom: ['', [Validators.required]],
      mail : ['', [Validators.required]],
      message : ['', [Validators.required]]
    });
  }

  submit(){
    console.log(this.formContact.value);
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Message envoyé !'});

  }

}
