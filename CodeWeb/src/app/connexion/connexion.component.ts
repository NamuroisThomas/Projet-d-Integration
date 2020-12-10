import { Component, OnInit } from '@angular/core';
import {ConnexionService} from './connexion.service';
import {HttpClient} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

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
  }

  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
  }

  onSignIn(data){
    const test = 'pi7' + CryptoJS.SHA256(data.formConnexionMdp).toString(CryptoJS.enc.Hex) + 'sel';
    this.connexionService.signIn().then(
      () => {
        this.http.get('http://62.210.130.145:3000/mailExist?mail=' + data.formConnexionMail)
          .subscribe(
            (res) =>
            {
              try {
                if (res[Object.keys(res)[2]][0].mailUtilisateur === data.formConnexionMail &&
                  res[Object.keys(res)[2]][0].mdpUtilisateur !== test) {
                  alert('mot de passe incorrect');
                }
                if (res[Object.keys(res)[2]][0].mailUtilisateur === data.formConnexionMail &&
                  res[Object.keys(res)[2]][0].mdpUtilisateur === test) {
                  alert('connexion...');
                  localStorage.setItem('user', JSON.stringify({idUtilisateur: res[Object.keys(res)[2]][0].idUtilisateur,
                    nomUtilisateur: res[Object.keys(res)[2]][0].nomUtilisateur,
                    prenomUtilisateur: res[Object.keys(res)[2]][0].prenomUtilisateur,
                    mailUtilisateur: res[Object.keys(res)[2]][0].mailUtilisateur,
                    telUtilisateur: res[Object.keys(res)[2]][0].telUtilisateur,
                    mdpUtilisateur: res[Object.keys(res)[2]][0].mdpUtilisateur,
                    idStatus: res[Object.keys(res)[2]][0].idStatus,
                    descriptionUtilisateur: res[Object.keys(res)[2]][0].descriptionUtilisateur,
                    avertissementUtilisateur: res[Object.keys(res)[2]][0].avertissementUtilisateur}));
                  this.role = this.readLocalStorageValue('user');
                }
              }
              catch (e) {
                alert('mail inéxistant, Vous devez créer un compte');
              }
            }
          );
      }
    );
  }

  onSignOut() {
    localStorage.clear();
    this.connexionService.signOut();
    alert('Déconnexion');
    this.role = this.readLocalStorageValue('user');
  }
}
