import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DemandeAideComponent } from './demande-aide/demande-aide.component';
import { ChatComponent } from './chat/chat.component';
import { ListeDemandeComponent } from './liste-demande/liste-demande.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { AvisReportComponent } from './avis-report/avis-report.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: 'demandeAide', component: DemandeAideComponent },
  { path: 'inscription', component: InscriptionComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    DemandeAideComponent,
    ChatComponent,
    ListeDemandeComponent,
    EditProfilComponent,
    AvisReportComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
