import { Component, OnInit } from '@angular/core';
import { GetListeDemandeService } from './liste-demande.service'

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.scss']
})
export class ListeDemandeComponent implements OnInit {

  listeDemande: any;
  constructor(private api: GetListeDemandeService) { }


  ngOnInit(){
    this.api.listeDemandeCall().subscribe((res) => {
      console.log(res[Object.keys(res)[2]]);
      this.listeDemande = res[Object.keys(res)[2]];
      console.log(this.listeDemande);
    });
  }

}
