import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FrontendGameRoutingModule } from './frontend-game-routing.module'

@NgModule({
  imports: [CommonModule, FrontendGameRoutingModule],
  declarations: [BoardComponent],
  exports: [BoardComponent]
})
export class FrontendGameModule {}
