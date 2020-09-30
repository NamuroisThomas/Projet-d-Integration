import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  nom: string;
  prenom: string;
  telephone: number;
  email: string;
  mdp: string;
  mdpconfirmer: string;
  options = false;
  constructor() {
  }


  ngOnInit(): void {
  }

  afficherConsole(){
    console.log('votre nom est : ' + this.nom + '\n votre prenom est : ' + this.prenom + '\n votre mail est : ' + this.email
      + '\n votre numéro de téléphone est : ' + this.telephone  + '\n votre mot de passe est : ' + this.mdp);
  }
}


