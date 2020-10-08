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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {FieldsetModule} from 'primeng/fieldset';
import {SidebarModule} from 'primeng/sidebar';
import { ConnexionComponent } from './connexion/connexion.component';



@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    DemandeAideComponent,
    ChatComponent,
    ListeDemandeComponent,
    EditProfilComponent,
    AvisReportComponent,
    PageNotFoundComponent,
    HomeComponent,
    ConnexionComponent

  ],
  imports: [
    FormsModule,
    MessagesModule,
    MessageModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    ToastModule,
    FieldsetModule,
    ToastModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
