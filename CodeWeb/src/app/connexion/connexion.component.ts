import { Component, OnInit } from '@angular/core';
import {ConnexionService} from './connexion.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  model: any = {};
  connexionStatus: boolean;
  role: string;

  constructor(private connexionService: ConnexionService, private http: HttpClient) { }

  ngOnInit() {
    this.role = this.readLocalStorageValue('user');
    console.log(this.role);
  }

  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
  }

  onSignIn(data){
    this.connexionService.signIn().then(
      () => {
        this.http.get('http://62.210.130.145:3000/mailExist?mail=' + data.formConnexionMail)
          .subscribe(
            (res) =>
            {
              try {
                if (res[Object.keys(res)[2]][0].mailUtilisateur === data.formConnexionMail &&
                  res[Object.keys(res)[2]][0].mdpUtilisateur !== data.formConnexionMdp) {
                  alert('mot de passe incorrect');
                }
                if (res[Object.keys(res)[2]][0].mailUtilisateur === data.formConnexionMail &&
                  res[Object.keys(res)[2]][0].mdpUtilisateur === data.formConnexionMdp) {
                  alert('connexion...');
                  localStorage.setItem('user', JSON.stringify({nomUtilisateur: this.model.username, mdpUtilisateur: this.model.password}));
                  this.role = this.readLocalStorageValue('user');
                  console.log(localStorage.getItem('user'));
                }
              }
              catch (e) {
                alert('mail inéxistant, Vous devez créer un compte');
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
    localStorage.clear();
    this.connexionService.signOut();
    alert('Déconnexion');
    this.role = this.readLocalStorageValue('user');
  }
/*  onSubmit(){
  }*/

}
