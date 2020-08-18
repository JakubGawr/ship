import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardActions } from '../actions/actions';
import { BoardFacade } from '../facade/facade';
import { map, pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { Cords } from '../reducers/reducer';
import { DataCell, DataGrid } from '../../board/table';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardFacade: BoardFacade) {
  }

  cordAdd$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BoardActions.addCord),
        pluck('cords'),
        withLatestFrom(
          this.boardFacade.selectedCells$
        ),
        switchMap(([cords, selectedCells]: [DataCell, Cords[]]) => {
          const canSelect = selectedCells.length > 0 ? !isInCellScope(cords, selectedCells) : true;
          if (canSelect) {
            return [
              BoardActions.markCellAsActive({
                data: {
                  ...cords,
                }
              }),
              BoardActions.addCordSuccess({ cords })
            ];
          }
          return [
            BoardActions.markCellAsUnactive({
              data: {
                ...cords,
              }
            }),
            BoardActions.addCordFail({id: cords.id})
          ];
        })
      );
  });
}

function isInCellScope(newCell: Cords, selectedCells: Cords[]) {
  return selectedCells.some((cell) => {
    const columnDifference = Math.abs(cell.column - newCell.column);
    const rowDifference = Math.abs(cell.row - newCell.row);
    return columnDifference === 1 && rowDifference === 1;
  });
}
