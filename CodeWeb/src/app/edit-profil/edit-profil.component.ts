import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNull } from 'util';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})

@Injectable()

export class EditProfilComponent implements OnInit{
  profil: any;
  constructor(private http: HttpClient) { }

  ngOnInit(){
    if (!isNull(JSON.parse(localStorage.getItem('user')))){
      this.profil = JSON.parse(localStorage.getItem('user'));
      return this.profil;
    }
    else {
      console.log('profil inéxistant');
    }
  }

  submit(data) {
      this.http.post('http://62.210.130.145:3000/profil', data)
        .subscribe((res) =>
          console.warn('result', res)
        );
      let existing = localStorage.getItem('user');
      existing = existing ? JSON.parse(existing) : {};
      existing['descriptionUtilisateur'] = data.formProfilDescriptionUtilisateur;
      localStorage.setItem('user', JSON.stringify(existing));
      alert('profile mis à jour');
    }

}
