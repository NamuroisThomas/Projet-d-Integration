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
import {MaListeComponent} from './ma-liste/ma-liste.component';
import {MesDemandesComponent} from './mes-demandes/mes-demandes.component';
import {ChatComponent} from './chat/chat.component';
import {ConversationsComponent} from './chat/conversations/conversations.component';
import {ChartModule} from 'primeng/chart';
import {ChatroomComponent} from './chat/chatroom/chatroom.component';
import {AjoutContactComponent} from './chat/ajout-contact/ajout-contact.component';


const appRoutes: Routes = [
  {
    path: '', component: NavbarComponent,
    children: [
      {path: 'home', component: HomeComponent},  /*remplacer HomeComponent ici par EditProfilComponent pour le moment pour eviter le dédoublement*/
      {path: 'listeAide', component: ListeDemandeComponent},
      {path: 'listeAide/:idDemande', component: DetailDemandeComponent},
      {path: 'demandeAide', canActivate: [AuthGuard], component: DemandeAideComponent},
      {path: 'maListe', canActivate: [AuthGuard], component: MaListeComponent},
      {path: 'mesDemandes', canActivate: [AuthGuard], component: MesDemandesComponent},
      {path: 'inscription', component: InscriptionComponent},
      {path: 'contactPage', component: ContactComponent},
      {path: 'editProfil', canActivate: [AuthGuard], component: EditProfilComponent},
      {path: 'connexion', component: ConnexionComponent},
      {path: 'chat', component: ChatComponent},
      {path: 'conversations', component: ConversationsComponent},
      {path: 'ajoutContact', component: AjoutContactComponent},
      {path: 'chatroom/:nickname/:roomname', component: ChatroomComponent},
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
