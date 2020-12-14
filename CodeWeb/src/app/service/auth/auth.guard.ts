import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { isNull} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Récupération de l'utilisateur connecté
    const isLoggedIn = !isNull(localStorage.getItem('user'));

    if (!isLoggedIn) {
      // Si pas d'utilisateur connecté : redirection vers la page de login
      alert('Vous n\'êtes pas connectés, vous allez être rediriger à la page d\'accueil');
      this.router.navigate(['/home']);
    }
    return isLoggedIn;
  }
}

