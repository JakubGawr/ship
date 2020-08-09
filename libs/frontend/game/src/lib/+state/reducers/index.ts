import { boardReducer, BoardState } from './reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface BoardMap {
  board: BoardState
}

export const board: ActionReducerMap<BoardMap> = {
  board: boardReducer
}
