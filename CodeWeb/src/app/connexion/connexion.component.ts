import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ConnexionService} from './connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  connexionStatus: boolean;

  constructor(private connexionService: ConnexionService) { }

  ngOnInit() {
    this.connexionStatus = this.connexionService.isAuth;
  }

  onSignIn(){
    this.connexionService.signIn().then(
      () => {
        alert('Connextion réussi');
        this.connexionStatus = this.connexionService.isAuth;
      }
    );
  }

  onSignOut() {
    this.connexionService.signOut();
    alert('Déconnexion');
    this.connexionStatus = this.connexionService.isAuth;
  }
/*  onSubmit(){
  }*/

}
