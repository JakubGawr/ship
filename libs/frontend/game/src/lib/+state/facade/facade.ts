import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardMap } from '../reducers';
import { getBoard, getSelectedCells, currentBoxId } from '../selectors/selectors';
import { BoardActions } from '../actions/actions';
import { DataCell } from '../../board/table';
import { Cords } from '../reducers/reducer';

@Injectable({ providedIn: 'root' })
export class BoardFacade {
  board$ = this.store.select(getBoard);
  selectedCells$ = this.store.select(getSelectedCells);
  currentBoxId$ = this.store.select(currentBoxId);

  constructor(private store: Store<BoardMap>) {
  }

  selectCell(cords: Cords) {
    this.store.dispatch(BoardActions.addCord({ cords }));
  }

  unSelectCell(data: DataCell) {
    // this.store.dispatch(BoardActions.markCellAsUnactive({ data }));
  }
}
