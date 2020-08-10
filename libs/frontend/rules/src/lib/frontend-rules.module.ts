import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './containers/rules/rules.component';
import { FrontendRulesRoutingModule } from './frontend-rules-routing.module';
import { TableModule } from '@ship-game/table'

@NgModule({
  imports: [CommonModule, FrontendRulesRoutingModule, TableModule],
  declarations: [RulesComponent],
})
export class FrontendRulesModule {}
