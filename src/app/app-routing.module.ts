import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LobbyComponent} from './component/lobby/lobby.component';
import {RegisterComponent} from "./component/register/register.component";
import {StoreComponent} from "./component/store/store.component";


const routes: Routes = [
  { path: 'lobby', component: LobbyComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'store/:id', component: StoreComponent},
  { path: '**', component: LobbyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
