import { NgModule } from '@angular/core';
import {AuthGuard} from './service/auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import {DemandeAideComponent} from './demande-aide/demande-aide.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {EditProfilComponent} from './edit-profil/edit-profil.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ContactComponent} from './contact/contact.component';
import {ListeDemandeComponent} from './liste-demande/liste-demande.component';
import {DetailDemandeComponent} from './detail-demande/detail-demande.component';


const appRoutes: Routes = [
  {
    path: '', component: NavbarComponent,
    children: [
      {path: 'home', component: HomeComponent},  /*remplacer HomeComponent ici par EditProfilComponent pour le moment pour eviter le dédoublement*/
      {path: 'listeAide', component: ListeDemandeComponent},
      {path: 'listeAide/:idDemande', component: DetailDemandeComponent},
      {path: 'demandeAide', canActivate: [AuthGuard], component: DemandeAideComponent},
      {path: 'inscription', component: InscriptionComponent},
      {path: 'contactPage', component: ContactComponent},
      {path: 'editProfil', canActivate: [AuthGuard], component: EditProfilComponent},
      {path: 'connexion', component: ConnexionComponent},
      {path: 'not-found', component: PageNotFoundComponent},
      {path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
