import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn : 'root'
})

export class InscriptionService{

  urlInscription = 'http://62.210.130.145:3000/inscription';

  postData = {
    formInscriptionNom: String,
    formInscriptionPrenom: String,
    formInscriptionMail: String,
    formInscriptionTel: String,
    formInscriptionMdp: String,
  };
  constructor(private http: HttpClient ){}

  postInscription(){
    this.http.post(this.urlInscription, this.postData).toPromise().then(data => {
      console.warn(data);
    });
  }

}
