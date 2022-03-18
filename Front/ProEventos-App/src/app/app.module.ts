import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PalestrantesComponent } from './component/palestrantes/palestrantes.component';
import { EventosComponent } from './component/eventos/eventos.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { ContatosComponent } from './component/contatos/contatos.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { EventoService } from './services/evento.service';

import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';

import { TituloComponent } from './sherad/titulo/titulo.component';
import { NavComponent } from './sherad/nav/nav.component';

@NgModule({
  declarations: [
      AppComponent,
      EventosComponent,
      ContatosComponent,
      DashboardComponent,
      PalestrantesComponent,
      PerfilComponent,
      TituloComponent,
      NavComponent,
      DateTimeFormatPipe,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        progressBar: true,
      }),
    NgxSpinnerModule,
  ],
  providers: [
    EventoService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
