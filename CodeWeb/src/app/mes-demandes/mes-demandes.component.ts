import { Component, OnInit } from '@angular/core';
import {GetListeDemandeService} from '../liste-demande/liste-demande.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.scss']
})
export class MesDemandesComponent implements OnInit {

  profil: any;
  listeDemande: any;
  nomPrenom: string;
  allListe: Array<any>;
  id: any;

  constructor(private api: GetListeDemandeService,
              private http: HttpClient)
  { }
  supprimerDemande(data){
    this.http.delete('http://62.210.130.145:3000/demande?idDemande=' + data).subscribe(
      () => {
        alert('demande supprimé');
        location.reload();
      }
    );
  }
  ngOnInit(): void {

    this.profil = JSON.parse(localStorage.getItem('user'));
    this.id = this.profil.idUtilisateur;
    this.api.listeDemandeCall().subscribe((res) => {
      this.listeDemande = res[Object.keys(res)[2]];
    });
    this.api.listeDemandeAllCall().subscribe((res) => {
      this.allListe = res[Object.keys(res)[2]];
    });
    this.nomPrenom = this.profil.nomUtilisateur + ' ' + this.profil.prenomUtilisateur;
  }
}
