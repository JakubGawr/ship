import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DataCell, DataGrid, Table } from './table';
import { CellComponent } from '@ship-game/table';
import { Observable } from 'rxjs';
import { BoardFacade } from '../+state/facade/facade';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {
  @ViewChildren(CellComponent) cells = new QueryList<CellComponent>();

  public board$: Observable<DataGrid>;

  constructor(private boardFacade: BoardFacade) {
  }

  ngOnInit(): void {
    this.board$ = this.boardFacade.board$.pipe(tap(e => console.log(e)));
  }

  ngAfterViewInit(): void {
    console.log(this.cells);
  }

  onSelect(data: DataCell) {
    if (data.isActive) {
      console.log('ok');
      return this.boardFacade.unSelectCell(data);
    }
    return this.boardFacade.selectCell(data);
  }

  trackBy(index) {
    return index;
  }

}
