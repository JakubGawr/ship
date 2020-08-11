import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { DataCell, DataGrid } from './table';
import { CellComponent, TableComponent } from '@ship-game/table';
import { Observable } from 'rxjs';
import { BoardFacade } from '../+state/facade/facade';
import { tap } from 'rxjs/operators';
import { DraggableDirective } from '../../../../../table/src/lib/directives/draggable.directive';

@Component({
  selector: 'ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, AfterViewInit {
  @ViewChildren(CellComponent) cells = new QueryList<CellComponent>();
  @ViewChildren(DraggableDirective) draggable = new QueryList<DraggableDirective>();
  @ViewChild(TableComponent, { static: true }) table: TableComponent;
  public board$: Observable<DataGrid>;

  constructor(private boardFacade: BoardFacade) {
  }

  ngOnInit(): void {
    this.board$ = this.boardFacade.board$;
    //this.boardFacade.selectedCells$.subscribe(e => console.log(e))
  }

  ngAfterViewInit(): void {
    this.draggable.forEach(drag => {
      drag.cell = this.cells.first;
      drag.table = this.table;
    });
  }

  onSelect(data: DataCell) {
    if (data.isActive) {
      //return this.boardFacade.unSelectCell(data);
    }
    return this.boardFacade.selectCell(data);
  }

  trackBy(index) {
    return index;
  }

}
