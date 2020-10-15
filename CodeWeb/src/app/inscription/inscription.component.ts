import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { MessageService } from 'primeng/api';
import {TestServices} from '../test.service';

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


  constructor(private test: TestServices) {
 ede53b151c8b664a735cdbd7ba598a71538caf37
  }

  public formInscription = new FormGroup({
    Nom: new FormControl(null),
    Prénom: new FormControl(null)
  })

  ngOnInit(): void {
  }

  afficherConsole(){
    this.test.postInscription();
  }

  submit(){
    console.log(this.formInscription.value);
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});

  }
}


