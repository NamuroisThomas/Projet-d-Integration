import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn : 'root'
})
export class TestServices{
url = 'http://62.210.130.145:3000/test';

urlInscription = 'http://62.210.130.145:3000/inscription';

postData = {
  formInscriptionNom:'erfe',
  formInscriptionPrenom:'grege',
  formInscriptionMail:'refe@hotmail.com',
  formInscriptionTel:'3278652654',
  formInscriptionMdp:'g54gh54kgh4',
};

  constructor(private http: HttpClient ){}
getTest(){
  return this.http.get(this.url);
}
postInscription(){
    this.http.post(this.urlInscription, this.postData).toPromise().then(data => {
      console.warn(data);
    });
}
}
