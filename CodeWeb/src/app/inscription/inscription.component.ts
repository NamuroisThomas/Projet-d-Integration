import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  providers: [MessageService]
})
export class InscriptionComponent implements OnInit {

  model: any = {};
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  submit(data) {
    this.http.post('http://62.210.130.145:3000/inscription', data)
      .subscribe((res) =>
        {
            if (data.formInscriptionMdp === data.formInscriptionMdpConfirmation) {
              alert('cool');
            }
            else{
              alert('pas cool');
            }
          }
      );
    console.log(data)
    alert('inscription completer');
  }
}
