import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GetListeDemandeService {

  constructor(
    private http: HttpClient
  ){}

  listeDemandeCall(){
    return this.http.get('http://62.210.130.145:3000/demandes');
  }
}
