import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoresComponent } from './containers/scores/scores.component';
import { FrontendScoresRoutingModule } from './frontend-scores-routing.module';

@NgModule({
  imports: [CommonModule, FrontendScoresRoutingModule],
  declarations: [ScoresComponent],
  exports: [ScoresComponent]
})
export class FrontendScoresModule {}
