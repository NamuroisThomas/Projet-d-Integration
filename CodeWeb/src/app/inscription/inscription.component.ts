import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TestServices} from '../test.service';

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
  mdpconfirmation: string;

  constructor(private test: TestServices) {
  }


  ngOnInit(): void {
  }

  afficherConsole(){
    this.test.postInscription();
  }
}


