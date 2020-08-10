import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardMap } from '../reducers';
import { getBoard } from '../selectors/selectors';
import { BoardActions } from '../actions/actions';
import { DataCell } from '../../board/table';

@Injectable({ providedIn: 'root' })
export class BoardFacade {
  board$ = this.store.select(getBoard);

  constructor(private store: Store<BoardMap>) {
  }

  selectCell(data: DataCell) {
    this.store.dispatch(BoardActions.markCellAsActive({ data }));
  }

  unSelectCell(data: DataCell) {
    this.store.dispatch(BoardActions.markCellAsUnactive({ data }));

  }
}
