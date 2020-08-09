import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Table } from './table';
import { CellComponent } from '@ship-game/table';

@Component({
  selector: 'ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {
  @ViewChildren(CellComponent) cells = new QueryList<CellComponent>();

  public board: Array<string[]> =  new Table(10).create();
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.cells)
  }

}
