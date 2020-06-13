import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LobbyComponent} from './component/lobby/lobby.component';
import {RegisterComponent} from "./component/register/register.component";
import {StoreComponent} from "./component/store/store.component";
import {LogInComponent} from "./component/log-in/log-in.component";
import {ProfileComponent} from "./component/profile/profile/profile.component";

import {StoreAreaTableComponent} from './component/store-area-table/store-area-table.component';

const routes: Routes = [
  { path: 'lobby', component: LobbyComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'store/:id', component: StoreComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'login', component: LogInComponent},
  { path: 'admin/storearea', component: StoreAreaTableComponent},
  { path: '**', component: LobbyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
