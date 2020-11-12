import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { MessageService } from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {GetListeDemandeService} from '../liste-demande/liste-demande.service';

@Component({
  selector: 'app-demande-aide',
  templateUrl: './demande-aide.component.html',
  styleUrls: ['./demande-aide.component.scss'],
  providers: [MessageService]
})
export class DemandeAideComponent implements OnInit {

 public demandeAide: FormGroup;
 public errorMessage: string;
 role: any;
 listeCategorie: any;
 levelNum: number;
 booleanNum: number;
 levels: [
    {num: 0, name: 'oui'},
    {num: 1, name: 'non'}
  ];

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router,
              private http: HttpClient,
              private api: GetListeDemandeService
              ) { }

  ngOnInit(){
    this.role = JSON.parse(localStorage.getItem('user'));
    this.api.listeCategorieCall().subscribe((res) => {
      console.log(res[Object.keys(res)[2]]);
      this.listeCategorie = res[Object.keys(res)[2]];
  });
    console.log(this.listeCategorie);
  }


  // onSubmit() {
  //   const titre =  this.demandeAide.get('titre').value;
  //   const description = this.demandeAide.get('description').value;
  //
  //   console.log(titre, description);
  // }
  toNumber(){
    this.levelNum = +this.levelNum;
    this.booleanNum = +this.booleanNum;
    console.log(this.levelNum);
    console.log(this.booleanNum);
  }
  submit(data){
      this.http.post('https://jsonplaceholder.typicode.com/posts', data)
        .subscribe((res) =>
          console.warn('result', res)
        );
  }
}

