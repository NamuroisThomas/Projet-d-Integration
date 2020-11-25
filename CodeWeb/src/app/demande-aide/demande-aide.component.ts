import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { MessageService } from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {GetListeDemandeService} from '../liste-demande/liste-demande.service';

@Component({
  selector: 'app-demande-aide',
  templateUrl: './demande-aide.component.html',
  styleUrls: ['./demande-aide.component.scss'],
  providers: [MessageService]
})
export class DemandeAideComponent implements OnInit {
  
  public demandeAide;
  public errorMessage: string;
  role: any;
  listeCategorie: any;
  listeCodePostaux: any;
  ONDefraiement: any;
  formDemandeDefraiement: any;
  formDemandeIdCodePostal: any;
  formDemandeIdCategorie: any;
  
  constructor( private http: HttpClient,
              private api: GetListeDemandeService ) { }
  
  ngOnInit(){
    this.role = JSON.parse(localStorage.getItem('user'));
    this.ONDefraiement = [{val: 1, desc: "Oui"}, {val: 0, desc: "Non"}];
    this.api.listeCategorieCall().subscribe((res) => {
      console.log(res[Object.keys(res)[2]]);
      this.listeCategorie = res[Object.keys(res)[2]];
    });
    this.api.listeCodePostauxCall().subscribe(res => {this.listeCodePostaux = res[Object.keys(res)[2]];});
    console.log(this.listeCategorie);
  }

  submit(data){
    this.http.post('http://62.210.130.145:3000/demande', data)
      .subscribe((res) =>
        console.warn('result', res)
      );
     alert('Demande introduite');
     location.reload();
  }
}

