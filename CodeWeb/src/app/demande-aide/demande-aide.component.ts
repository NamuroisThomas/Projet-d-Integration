import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-demande-aide',
  templateUrl: './demande-aide.component.html',
  styleUrls: ['./demande-aide.component.scss'],
  providers: [MessageService]
})
export class DemandeAideComponent implements OnInit {

 public demandeAide: FormGroup;
 public errorMessage: string;

 public formDemandeAide = new FormGroup({
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
    this.demandeAide = this.formBuilder.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  // onSubmit() {
  //   const titre =  this.demandeAide.get('titre').value;
  //   const description = this.demandeAide.get('description').value;
  //
  //   console.log(titre, description);
  // }

  submit(){
    console.log(this.formDemandeAide.value);
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});

  }
}

