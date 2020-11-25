import { Component, OnInit } from '@angular/core';
import {isNull} from "util";
import {HttpClient} from '@angular/common/http';
import {GetListeDemandeService} from '../liste-demande/liste-demande.service';

@Component({
  selector: 'app-ma-liste',
  templateUrl: './ma-liste.component.html',
  styleUrls: ['./ma-liste.component.scss']
})
export class MaListeComponent implements OnInit {
  profil: any;
  listeDemande: any;
  nomPrenom: string;
  constructor(private api: GetListeDemandeService,
              private http: HttpClient)
  { }

  ngOnInit(): void {
    this.profil = JSON.parse(localStorage.getItem('user'));
    this.api.listeDemandeCall().subscribe((res) => {
      this.listeDemande = res[Object.keys(res)[2]];
      });
    this.nomPrenom = this.profil.nomUtilisateur + ' ' + this.profil.prenomUtilisateur;
    console.log(this.nomPrenom);
  }
}
