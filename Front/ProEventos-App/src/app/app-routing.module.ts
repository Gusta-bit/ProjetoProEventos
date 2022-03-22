import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContatosComponent } from './component/contatos/contatos.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { PalestrantesComponent } from './component/palestrantes/palestrantes.component';

import { EventoDetalheComponent } from './component/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './component/eventos/evento-lista/evento-lista.component';
import { EventosComponent } from './component/eventos/eventos.component';

import { UserComponent } from './component/user/user.component';
import { LoginComponent } from './component/user/login/login.component';
import { RegistrationComponent } from './component/user/registration/registration.component';
import { PerfilComponent } from './component/user/perfil/perfil.component';

const routes: Routes = [

  {   path: 'user' , component: UserComponent,
    children: [
      {path: 'login' , component: LoginComponent},
      {path: 'registration' , component: RegistrationComponent},
    ]
  },
  { path: 'user/perfil' , component: PerfilComponent},

  { path: 'eventos' , redirectTo: 'eventos/lista'},
  {   path: 'eventos' , component: EventosComponent,
    children: [
      {path: 'detalhe/:id' , component: EventoDetalheComponent},
      {path: 'detalhe' , component: EventoDetalheComponent},
      {path: 'lista' , component: EventoListaComponent},
    ]
  },
  { path: 'palestrantes' , component: PalestrantesComponent},
  { path: 'contatos' , component: ContatosComponent},
  { path: 'dashboard' , component: DashboardComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
