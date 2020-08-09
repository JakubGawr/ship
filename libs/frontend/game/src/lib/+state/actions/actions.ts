import { createAction, props } from '@ngrx/store';
import { DataCell, DataGrid } from '../../board/table';

export const BoardActions = {
  initCustomBoard: createAction('[Board] Initialize custom board', props<{ board: DataGrid }>()),
  markCellAsActive: createAction('[Board] Mark cell as active', props<{data: DataCell}>()),
  markCellAsUnactive: createAction('[Board] Mark cell as unactive', props<{data: DataCell}>())
};
