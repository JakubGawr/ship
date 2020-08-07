import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'gra',
    loadChildren: () => import('@ship-game/frontend/game').then(m => m.FrontendGameModule)
  },{
    path: 'zasady',
    loadChildren: () => import('@ship-game/frontend/rules').then(m => m.FrontendRulesModule)
  },{
    path: 'statystyki',
    loadChildren: () => import('@ship-game/frontend/scores').then(m => m.FrontendScoresModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
