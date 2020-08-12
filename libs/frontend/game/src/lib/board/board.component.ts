import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { DataCell, DataGrid, Table } from './table';
import { CellComponent, TableComponent } from '@ship-game/table';
import { Observable } from 'rxjs';
import { BoardFacade } from '../+state/facade/facade';
import { DraggableDirective } from '../../../../../table/src/lib/directives/draggable.directive';
import { DestroyBoxDirective } from '../../../../../table/src/lib/directives/destroy-box.directive';
import { BoxData } from '../+state/reducers/reducer';

@Component({
  selector: 'ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, AfterViewInit {
  @ViewChildren(CellComponent) cells = new QueryList<CellComponent>();
  @ViewChildren(DraggableDirective) draggable = new QueryList<DraggableDirective>();
  @ViewChildren(DestroyBoxDirective) destroyBox = new QueryList<DestroyBoxDirective>();
  @ViewChild(TableComponent, { static: true }) table: TableComponent;
  public board$: Observable<DataGrid>;
  public boxData$: Observable<BoxData>;
  public gridBox = new Table(5, 4).create();

  constructor(private boardFacade: BoardFacade) {
  }

  ngOnInit(): void {
    this.board$ = this.boardFacade.board$;
    this.boxData$ = this.boardFacade.currentBoxId$;
  }

  ngAfterViewInit(): void {
    this.draggable.forEach(drag => {
      drag.cell = this.cells.first;
      drag.table = this.table;
    });
  }

  onSelect(data: DataCell) {
    return this.boardFacade.selectCell(data);
  }

  trackBy(index) {
    return index;
  }

}
