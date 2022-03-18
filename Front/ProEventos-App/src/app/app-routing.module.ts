import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './component/contatos/contatos.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EventosComponent } from './component/eventos/eventos.component';
import { PalestrantesComponent } from './component/palestrantes/palestrantes.component';
import { PerfilComponent } from './component/perfil/perfil.component';

const routes: Routes = [

  { path: 'eventos' , component: EventosComponent},
  { path: 'palestrantes' , component: PalestrantesComponent},
  { path: 'contatos' , component: ContatosComponent},
  { path: 'dashboard' , component: DashboardComponent},
  { path: 'perfil' , component: PerfilComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
