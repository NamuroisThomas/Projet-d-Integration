import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  providers: [MessageService]
})
export class InscriptionComponent implements OnInit {
  titre = 'Inscription';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  submit(data) {
    if (data.formInscriptionMdp === data.formInscriptionMdpConfirmation){
      data.formInscriptionMdp = 'pi7' + CryptoJS.SHA256(data.formInscriptionMdp).toString(CryptoJS.enc.Hex) + 'sel';
      this.http.post('http://62.210.130.145:3000/inscription', data)
      .subscribe((res) =>
        console.warn('result', res)
      );
      alert('Inscription complétée');
      location.reload();
    }
    else {
      alert('Les mots de passe ne correspondent pas');
    }
  }
}
