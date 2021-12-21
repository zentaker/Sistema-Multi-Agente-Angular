import { NgModule } from '@angular/core';

//modules
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';

import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';


const routes: Routes = [

  //path: '/dasboard' PagesRouting
  //path: '/auth' AuthRouting
  //path '/medicos' MedicosRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //path de rutas por defecto
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
