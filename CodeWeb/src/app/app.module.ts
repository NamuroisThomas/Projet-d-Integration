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
import { FormsModule} from '@angular/forms';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
