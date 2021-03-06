import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardMap } from '../reducers';


const boardMap = createFeatureSelector<BoardMap>('board');
const boardState = createSelector(boardMap, (state) => state.board);

export const getBoard = createSelector(boardState, (state) => {
  return state.board;
});

export const getSelectedCells = createSelector(boardState, (state) => {
  return state.selectedCells;
});

export const currentBoxId = createSelector(boardState, (state) => {
  return state.currentBox;
});
