import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class GetListeDemandesService {
  constructor(
    private http: HttpClient
  ){}

  listeDemande(){
    return this.http.get('http://62.210.130.145:3000/demandeNonAcceptee');
  }

}
