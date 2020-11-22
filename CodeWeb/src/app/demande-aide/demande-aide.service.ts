import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn : 'root'
})

export class InscriptionService{

  urlInscription = 'http://62.210.130.145:3000/demande';

  postData = {
    formDemandeTitre: String,
    formDemandeDescription: String,
    formDemandeDate: Date,
    formDemandeIdCategorie: Number,
    formDemandeIdUtilisateur: Number,
    formDemandeDefraiement: String,
    formDemandeIdCodePostal: Number,
  };
  constructor(private http: HttpClient ){}

  postDemande(){
    this.http.post(this.urlInscription, this.postData).toPromise().then(data => {
      console.warn(data);
    });
  }

}
