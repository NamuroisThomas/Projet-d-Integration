import { Component, OnInit } from '@angular/core';
import { GetListeDemandeService } from './liste-demande.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.scss']
})
export class ListeDemandeComponent implements OnInit {

  listeDemande: Array<any>;
  defraiementListe: any;
  aideMenListe: Array<any>;
  coutureListe: Array<any>;
  elecliste: Array<any>;
  travauxListe: Array<any>;
  autreListe: Array<any>;
  nonListe: Array<any>;
  allListe: Array<any>;
  peintureListe: Array<any>;
  courseListe: Array<any>;
  transportListe: Array<any>;
  jardinageListe: Array<any>;
  cuisineListe: Array<any>;
  listeDemande1: any;
  listeDemande2: any;
  filtre: string;
  demande: any;
  ordreAsc: any;
  ordreDesc: any;
  fa: any;
  fb: any;
  profil: any;
  accepteDemande: any;
  page: number;
  collection = [];
  test: Array<any>;

  constructor(private api: GetListeDemandeService,
              private http: HttpClient) {
    for (let i = 1; i <= 1000; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  detail(id: number){
    return this.http
      .get('http://62.210.130.145:3000/demandes?idDemande=' + id)
      .subscribe((res) => {
      this.demande = res[Object.keys(res)[2]][0];
    });
  }
  accepterDemande(data){
    this.http.post('http://62.210.130.145:3000/accepteDemande',
      {formAccepteDemandeIdAccepteur: this.profil.idUtilisateur,
        formAccepteDemandeIdDemande: data
      })
      .subscribe( (res) => {
          alert('demande accepté');
          location.reload();
        }
      );
  }
  submit(data){
    this.http.post('http://62.210.130.145:3000/accepteDemande', data)
      .subscribe((res) =>
        console.warn('result', res)
      );
  }

  ngOnInit(){
    this.api.listeDemandeCall().subscribe((res) => {
      this.listeDemande = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeDefraimentCall().subscribe((res) => {
      this.defraiementListe = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeNonCall().subscribe((res) => {
      this.nonListe = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeAllCall().subscribe((res) => {
      this.allListe = res[Object.keys(res)[2]];
      this.listeDemande1 = this.allListe.slice();
      this.listeDemande2 = this.allListe.slice();
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
    });
    this.api.listeDemandeCourseCall().subscribe((res) => {
      this.courseListe = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeCuisineCall().subscribe((res) => {
      this.cuisineListe = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeAideMenCall().subscribe((res) => {
      this.aideMenListe = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeElecCall().subscribe((res) => {
      this.elecliste = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeJardinageCall().subscribe((res) => {
      this.jardinageListe = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeAutreCall().subscribe((res) => {
      this.autreListe = res[Object.keys(res)[2]];
    });
    this.api.listeDemandePeintureCall().subscribe((res) => {
      this.peintureListe = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeTravauxCall().subscribe((res) => {
      this.travauxListe = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeTransportCall().subscribe((res) => {
      this.transportListe = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeCoutureCall().subscribe((res) => {
      this.coutureListe = res[Object.keys(res)[2]];
    });
    this.filtre = 'all';
    this.profil = JSON.parse(localStorage.getItem('user'));
  }

  onChangePage(listeDemande: Array<any>) {
    // update current page of items
    this.listeDemande = listeDemande;
  }

}
