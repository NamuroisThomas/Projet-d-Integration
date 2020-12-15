import { Component, OnInit } from '@angular/core';
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
  allListe: Array<any>;

  constructor(private api: GetListeDemandeService,
              private http: HttpClient)
  { }
  desaccepterDemande(data){
    this.http.post('http://62.210.130.145:3000/desaccepteDemande',
      {formAccepteDemandeIdAccepteur: this.profil.idUtilisateur,
        formAccepteDemandeIdDemande: data
      })
      .subscribe( (res) => {
          alert('demande rejeté');
          location.reload();
        }
      );
  }
  ngOnInit(): void {
    this.profil = JSON.parse(localStorage.getItem('user'));
    this.api.listeDemandeCall().subscribe((res) => {
      this.listeDemande = res[Object.keys(res)[2]];
      });
    this.api.listeDemandeAllCall().subscribe((res) => {
      this.allListe = res[Object.keys(res)[2]];
    });
    this.nomPrenom = this.profil.nomUtilisateur + ' ' + this.profil.prenomUtilisateur;
  }
}
