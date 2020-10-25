import { Component, OnInit } from '@angular/core';
import {ConnexionService} from './connexion.service';
import {HttpClient} from '@angular/common/http';
import {catchError, map, filter, mergeMap} from 'rxjs/operators';
import {throwError, Observable, pipe, of} from 'rxjs';
import {error} from 'selenium-webdriver';

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
        this.http.get('http://62.210.130.145:3000/mailExist?mail=' + data.formConnexionMail)
          .subscribe(
            (res) =>
            {
              if (res[Object.keys(res)[2]][0].mailUtilisateur === '' || res[Object.keys(res)[2]][0].mdpUtilisateur === '' ){
                alert('le champ mail et/ou mot de passe vide');
              }
              if (res[Object.keys(res)[2]][0].mailUtilisateur !== '' && res[Object.keys(res)[2]][0].mdpUtilisateur !== '' &&
                res[Object.keys(res)[2]][0].mailUtilisateur === data.formConnexionMail &&
                res[Object.keys(res)[2]][0].mdpUtilisateur !== data.formConnexionMdp ) {
              alert('mot de passe incorrect');
              }
              if (res[Object.keys(res)[2]][0].mailUtilisateur !== '' && res[Object.keys(res)[2]][0].mdpUtilisateur !== '' &&
                res[Object.keys(res)[2]][0].mailUtilisateur === data.formConnexionMail &&
                res[Object.keys(res)[2]][0].mdpUtilisateur === data.formConnexionMdp ){
                alert('connexion...');
                this.connexionStatus = this.connexionService.isAuth;
              }
              else{
                alert('erreur');
              }
            }
          );
      }
    );
    /*
    this.connexionService.signIn().then(
      () => {
        this.http.get('http://62.210.130.145:3000/utilisateur?mail=' + data.formConnexionMail)
          .subscribe(
            (res) =>
              console.warn(res[Object.keys(res)[2]][0].utilisateur)
        )
        alert('connexion...');
        this.connexionStatus = this.connexionService.isAuth;
      }
    );
    */
  }

  onSignOut() {
    this.connexionService.signOut();
    alert('Déconnexion');
    this.connexionStatus = this.connexionService.isAuth;
  }
/*  onSubmit(){
  }*/

}
