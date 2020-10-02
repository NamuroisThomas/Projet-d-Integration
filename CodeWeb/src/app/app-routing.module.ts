import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemandeAideComponent} from './demande-aide/demande-aide.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
//https://angular.io/guide/cheatsheet

const appRoutes: Routes = [
  {path: 'inscription', component: InscriptionComponent},
  {path: 'demandeAide', component: DemandeAideComponent},
  {path: '', component: HomeComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
