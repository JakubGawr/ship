import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FrontendGameRoutingModule } from './frontend-game-routing.module'
import { TableModule } from '@ship-game/table';

@NgModule({
  imports: [CommonModule, FrontendGameRoutingModule, TableModule],
  declarations: [BoardComponent],
  exports: [BoardComponent]
})
export class FrontendGameModule {}
