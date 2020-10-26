import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemandeAideComponent} from './demande-aide/demande-aide.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {EditProfilComponent} from './edit-profil/edit-profil.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ContactComponent} from './contact/contact.component';


const appRoutes: Routes = [
  {
    path: '', component: NavbarComponent,
    children: [
      {path: 'home', component: HomeComponent},  /*remplacer HomeComponent ici par EditProfilComponent pour le moment pour eviter le dédoublement*/
      {path: 'demandeAide', component: DemandeAideComponent},
      {path: 'inscription', component: InscriptionComponent},
      {path: 'contactPage', component: ContactComponent},
      {path: 'editProfil', component: EditProfilComponent},
      {path: 'connexion', component: ConnexionComponent},
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
