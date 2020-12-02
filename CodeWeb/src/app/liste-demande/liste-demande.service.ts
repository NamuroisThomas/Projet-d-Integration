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

  listeCategorieCall(){
    return this.http.get('http://62.210.130.145:3000/categories');
  }
  
  listeCodePostauxCall(){
    return this.http.get('http://62.210.130.145:3000/codePostal');
  }

  listeDemandeCall(){
    return this.http.get('http://62.210.130.145:3000/demandes');
  }

  listeDemandeDefraimentCall(){
    return this.http.get('http://62.210.130.145:3000/demandeDefraiement');
  }

  listeDemandeAllCall(){
    return this.http.get('http://62.210.130.145:3000/demandeNonAcceptee');
  }

  listeDemandeNonCall(){
    return this.http.get('http://62.210.130.145:3000/demandeAcceptee');
  }

  listeDemandeCourseCall(){
    return this.http.get('http://62.210.130.145:3000/demandes?idCateg=1');
  }

  listeDemandeAideMenCall(){
    return this.http.get('http://62.210.130.145:3000/demandes?idCateg=2');
  }

  listeDemandeTravauxCall(){
    return this.http.get('http://62.210.130.145:3000/demandes?idCateg=3');
  }

  listeDemandeTransportCall(){
    return this.http.get('http://62.210.130.145:3000/demandes?idCateg=4');
  }

  listeDemandeCoutureCall(){
    return this.http.get('http://62.210.130.145:3000/demandes?idCateg=5');
  }

  listeDemandeJardinageCall(){
    return this.http.get('http://62.210.130.145:3000/demandes?idCateg=6');
  }

  listeDemandeElecCall(){
    return this.http.get('http://62.210.130.145:3000/demandes?idCateg=7');
  }

  listeDemandePeintureCall(){
    return this.http.get('http://62.210.130.145:3000/demandes?idCateg=8');
  }

  listeDemandeCuisineCall(){
    return this.http.get('http://62.210.130.145:3000/demandes?idCateg=9');
  }

  listeDemandeAutreCall(){
    return this.http.get('http://62.210.130.145:3000/demandes?idCateg=24');
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
