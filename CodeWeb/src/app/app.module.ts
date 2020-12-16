import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DemandeAideComponent } from './demande-aide/demande-aide.component';
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
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { ConnexionComponent } from './connexion/connexion.component';
import {HttpClientModule} from '@angular/common/http';
import {ConnexionService} from './connexion/connexion.service';
import { ContactService } from './contact/contact.service';
import { DetailDemandeComponent } from './detail-demande/detail-demande.component';
import { MaListeComponent } from './ma-liste/ma-liste.component';
import { MesDemandesComponent } from './mes-demandes/mes-demandes.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';
import { AjoutContactComponent } from './chat/ajout-contact/ajout-contact.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { ConversationsComponent } from './chat/conversations/conversations.component';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';

import { GdprComponent } from './gdpr/gdpr.component';

import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';



@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    DemandeAideComponent,
    ListeDemandeComponent,
    EditProfilComponent,
    AvisReportComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    ContactComponent,
    ConnexionComponent,
    DetailDemandeComponent,
    MaListeComponent,
    MesDemandesComponent,
    FooterComponent,
    ChatComponent,
    AjoutContactComponent,
    ChatroomComponent,
    ConversationsComponent,
    GdprComponent

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
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule
  ],
  providers: [
    ConnexionService,
    ContactService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
