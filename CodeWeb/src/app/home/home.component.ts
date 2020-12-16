import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestServices} from '../test.service';
import {GetListeDemandeService} from '../liste-demande/liste-demande.service';
import {GetListeDemandesService} from './home.component.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  welcome = 'Bienvenue sur NeedHelp!';
  works = 'Comment cela fonctionne ?';
  listeDemande: any;
  nombreListe: number;

  constructor(private api: GetListeDemandesService) { }

  ngOnInit(){
    this.api.listeDemande().subscribe((res) => {
      this.listeDemande = res[Object.keys(res)[2]];
      this.nombreListe = this.listeDemande.length;
    });
  }

}
