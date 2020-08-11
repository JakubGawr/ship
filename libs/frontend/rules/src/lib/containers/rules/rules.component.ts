import { Component, OnInit } from '@angular/core';
import { BoardFacade } from '../../../../../game/src/lib/+state/facade/facade';

export interface RulesIcons{
  path: string;
  caption: string;
}

@Component({
  selector: 'ship-game-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  public icons: RulesIcons[] = [{
    path: 'miss.svg',
    caption: 'pudło'
  },{
    path: 'hit.svg',
    caption: 'trafiony'
  },{
    path: 'sink.svg',
    caption: 'zatopiony'
  }];

  constructor(private boardFacade: BoardFacade) { }

  board$ = this.boardFacade.board$

  ngOnInit(): void {
  }

}
