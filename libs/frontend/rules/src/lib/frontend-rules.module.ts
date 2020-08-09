import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './containers/rules/rules.component';
import { FrontendRulesRoutingModule } from './frontend-rules-routing.module';

@NgModule({
  imports: [CommonModule, FrontendRulesRoutingModule],
  declarations: [RulesComponent],
})
export class FrontendRulesModule {}
