import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GetListeDemandeService {

  demandeDetail: any;
  constructor(
    private http: HttpClient
  ){}

  detail(id: number){
    this.http.get('http://62.210.130.145:3000/demandes?idDemande=' + id).subscribe((res) => {
      this.demandeDetail = res[Object.keys(res)[2]][0];
      console.log(this.demandeDetail);
    });
    return this.demandeDetail;
  };


  listeDemandeCall(){
    return this.http.get('http://62.210.130.145:3000/demandes');
  }

/*  this.api.listeDemandeCall().subscribe((res) => {
  console.log(res[Object.keys(res)[2]]);
  this.listeDemande = res[Object.keys(res)[2]];
  for (const liste of this.listeDemande){
  console.log(liste);
}
console.log(this.listeDemande);
});*/
}
