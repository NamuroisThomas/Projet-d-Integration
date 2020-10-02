import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemandeAideComponent} from './demande-aide/demande-aide.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {EditProfilComponent} from './edit-profil/edit-profil.component';



const appRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: 'home', component: EditProfilComponent},  /*remplacer HomeComponent ici par EditProfilCompoenent pour le moment pour eviter le dédoublement*/
      {path: 'demandeAide', component: DemandeAideComponent},
      {path: 'inscription', component: InscriptionComponent},
      {path: 'not-found', component: PageNotFoundComponent},
      {path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
