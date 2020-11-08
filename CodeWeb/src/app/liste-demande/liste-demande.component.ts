import { Component, OnInit } from '@angular/core';
import { GetListeDemandeService } from './liste-demande.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.scss']
})
export class ListeDemandeComponent implements OnInit {

  listeDemande: any;
  listeDemande1: any;
  listeDemande2: any;
  filtre: string;
  demande: any;
  ordreAsc: any;
  ordreDesc: any;
  fa: any;
  fb: any;

  constructor(private api: GetListeDemandeService,
              private http: HttpClient) { }

  detail(id: number){
    return this.http.get('http://62.210.130.145:3000/demandes?idDemande=' + id).subscribe((res) => {
      console.log(res[Object.keys(res)[2]][0]);
      this.demande = res[Object.keys(res)[2]][0];
    });
  }

  ngOnInit(){
    this.api.listeDemandeCall().subscribe((res) => {
      console.log(res[Object.keys(res)[2]]);
      this.listeDemande = res[Object.keys(res)[2]];
      this.listeDemande1 = this.listeDemande.slice();
      this.listeDemande2 = this.listeDemande.slice();
      this.ordreDesc = this.listeDemande1.sort((a, b) => {
        this.fa = new Date(a.dateDemande);
        this.fb = new Date(b.dateDemande);
        return this.fa - this.fb;
      });
      this.ordreAsc =  this.listeDemande2.sort((a, b) => {
        this.fa = new Date(a.dateDemande);
        this.fb = new Date(b.dateDemande);
        return this.fb -  this.fa;
      });
      console.log(this.listeDemande);
      console.log(this.ordreDesc);
    });
    this.filtre = 'all';
  }

}
