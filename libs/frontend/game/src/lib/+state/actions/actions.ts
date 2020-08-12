import { createAction, props } from '@ngrx/store';
import { DataCell, DataGrid } from '../../board/table';
import { BoxData, Cords } from '../reducers/reducer';

export const BoardActions = {
  initCustomBoard: createAction('[Board] Initialize custom board', props<{ board: DataGrid }>()),
  markCellAsActive: createAction('[Board] Mark cell as active', props<{ data: DataCell }>()),
  markCellAsUnactive: createAction('[Board] Mark cell as unactive', props<{ data: DataCell }>()),
  addCord: createAction('[Board] Add Cord', props<{ cords: DataCell }>()),
  addCordSuccess: createAction('[Board] Add Cord Success', props<{ cords: DataCell, boxAdded: boolean }>()),
  addCordFail: createAction('[Board] Add Cord Fail', props<BoxData>())
};
