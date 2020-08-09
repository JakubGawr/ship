import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardMap } from '../reducers';


const boardMap = createFeatureSelector<BoardMap>('board');
const boardState = createSelector(boardMap, (state) => state.board)

export const getBoard = createSelector(boardState, (state) => {
  return state.board;
});
