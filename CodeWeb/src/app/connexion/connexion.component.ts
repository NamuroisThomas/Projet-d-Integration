import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ConnexionService} from './connexion.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  connexionStatus: boolean;

  constructor(private connexionService: ConnexionService, private http: HttpClient) { }

  ngOnInit() {
    this.connexionStatus = this.connexionService.isAuth;
  }

  onSignIn(data){
    this.connexionService.signIn().then(
      () => {
        this.http.get('http://62.210.130.145:3000/utilisateur?mail=' + data.formConnexionMail)
          .subscribe((result) =>
            console.warn(result));
        alert('connexion...');
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
