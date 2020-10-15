import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { MessageService } from 'primeng/api';
import {InscriptionService} from './inscription.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  providers: [MessageService]
})
export class InscriptionComponent implements OnInit {
  formInscriptionNom: string;
  formInscriptionPrenom: string;
  formInscriptionTel: number;
  formInscriptionMail: string;
  formInscriptionMdp: string;
  mdpconfirmation: string;

  options = false;
  private messageService: any;


  constructor(private inscription: InscriptionService) {
  }

  public formInscription = new FormGroup({
    Nom: new FormControl(null),
    Prénom: new FormControl(null)
  })

  ngOnInit(): void {
  }

  afficherConsole(){
    this.inscription.postInscription();
  }

  submit(){
    console.log(this.formInscription.value);
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});

  }
}


