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
<<<<<<< HEAD
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
=======
import { RecaptchaModule,RecaptchaFormsModule } from 'ng-recaptcha';
import { ConversationsComponent } from './chat/conversations/conversations.component';
import { AjoutContactComponent } from './chat/ajout-contact/ajout-contact.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {DatePipe} from "@angular/common";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
>>>>>>> 4e6c48e65faea8c593db7fac931fb7119b8d860b


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
    NavbarComponent,
    ContactComponent,
    ConnexionComponent,
    DetailDemandeComponent,
    MaListeComponent,
    MesDemandesComponent,
    ConversationsComponent,
    AjoutContactComponent,
    ChatroomComponent

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
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSidenavModule,
    MatCardModule
  ],
  providers: [
    ConnexionService,
    ContactService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
