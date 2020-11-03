import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNull } from 'util';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})

@Injectable()

export class EditProfilComponent implements OnInit{
  profil: any
  constructor() { }

  ngOnInit(){
    if (!isNull(JSON.parse(localStorage.getItem('user')))){
      this.profil = JSON.parse(localStorage.getItem('user'))
      return this.profil;
    }
    else {
      console.log('profil inéxistant');
    }
  }

}



/*
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { isNull } from 'util';


export class AuthGuard implements CanActivate {

constructor(

) { }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Récupération de l'utilisateur connecté
    const isLoggedIn = !isNull(localStorage.getItem('user'));

    if (!isLoggedIn) {
      // Si pas d'utilisateur connecté : redirection vers la page de login
      console.log('Vous n\'êtes pas connectés');
      this.router.navigate(['/login']);
    }
    return isLoggedIn;
  }
}

 */
