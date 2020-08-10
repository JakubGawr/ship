import { Component, OnInit } from '@angular/core';
import { BoardFacade } from '../../../../../game/src/lib/+state/facade/facade';

@Component({
  selector: 'ship-game-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  constructor(private boardFacade: BoardFacade) { }

  board$ = this.boardFacade.board$

  ngOnInit(): void {
  }

}
