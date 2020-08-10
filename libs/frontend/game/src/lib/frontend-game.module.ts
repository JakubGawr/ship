import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FrontendGameRoutingModule } from './frontend-game-routing.module'
import { TableModule } from '@ship-game/table';
import { StoreModule } from '@ngrx/store';
import { board } from './+state/reducers';
import { BoardFacade } from './+state/facade/facade';

@NgModule({
  imports: [
    CommonModule,
    FrontendGameRoutingModule,
    TableModule,
    StoreModule.forFeature('board', board)
  ],
  declarations: [BoardComponent],
  exports: [BoardComponent]
})
export class FrontendGameModule {}
