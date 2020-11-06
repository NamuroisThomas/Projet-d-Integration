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
  demande: any;
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
    });
  }

}
