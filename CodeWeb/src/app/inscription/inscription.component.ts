import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  providers: [MessageService]
})
export class InscriptionComponent implements OnInit {
  nom: string;
  prenom: string;
  telephone: number;
  email: string;
  mdp: string;
  mdpconfirmation: string;
  options = false;
  private messageService: any;
  constructor() {
  }

  public formInscription = new FormGroup({
    Nom: new FormControl(null),
    Prénom: new FormControl(null)
  })

  ngOnInit(): void {
  }

  afficherConsole(){
    console.log('votre nom est : ' + this.nom + '\n votre prenom est : ' + this.prenom + '\n votre mail est : ' + this.email
      + '\n votre numéro de téléphone est : ' + this.telephone  + '\n votre mot de passe est : ' + this.mdp);
  }

  submit(){
    console.log(this.formInscription.value);
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});

  }
}


