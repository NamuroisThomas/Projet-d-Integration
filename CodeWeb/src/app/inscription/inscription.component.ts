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

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
  }
  submit(data){
    this.http.post('http://62.210.130.145:3000/inscription',data)
      .subscribe((result)=>
        console.warn('result',result)
      )
    console.warn(data);
  }
}


