import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component';
import { HomePageComponent } from '../../../../libs/frontend/dashboard/src/lib/home-page/home-page.component';
 
const routes: Routes = [{
  path: '',
  component: HomePageComponent,
},{
  path: 'gra',
  loadChildren: () => import('@ship-game/frontend/game').then(m => m.FrontendGameModule)
}]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }