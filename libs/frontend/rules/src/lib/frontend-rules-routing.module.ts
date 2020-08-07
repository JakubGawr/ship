import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RulesComponent } from './containers/rules/rules.component';

const routes: Routes = [{
  path: '',
  component: RulesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRulesRoutingModule {
}
