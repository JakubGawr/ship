import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FrontendGameRoutingModule } from './frontend-game-routing.module'
import { TableModule } from '@ship-game/table';
import { StoreModule } from '@ngrx/store';
import { board } from './+state/reducers';
import { BoardEffects } from './+state/effects/board.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    FrontendGameRoutingModule,
    TableModule,
    StoreModule.forFeature('board', board),
    EffectsModule.forFeature([BoardEffects]),
  ],
  declarations: [BoardComponent],
  exports: [BoardComponent]
})
export class FrontendGameModule {}
