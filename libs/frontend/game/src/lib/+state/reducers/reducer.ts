import { DataCell, DataGrid, Table } from '../../board/table';
import { Action, createReducer, on } from '@ngrx/store';
import { BoardActions } from '../actions/actions';

export interface Cords {
  row: number,
  column: number
}

export interface BoxData {
  id: number[],
  boxAdded: boolean
}

export interface BoardState {
  board: DataGrid,
  selectedCells: Cords[],
  playerAction: boolean,
  currentBox: BoxData
};

const initialState: BoardState = {
  board: new Table(10).create(),
  selectedCells: [],
  playerAction: true,
  currentBox: null
};

const reducer = createReducer(initialState,
  on(BoardActions.initCustomBoard, ((state, { board }) => {
    return {
      ...state,
      board
    };
  })),

  on(BoardActions.markCellAsActive, ((state, { data }) => {
    const updatedBoard = updateCell(state.board, data);
    return {
      ...state,
      board: updatedBoard
    };
  })),

  on(BoardActions.markCellAsUnactive, ((state, { data }) => {
    const updatedBoard = updateCell(state.board, data, false);
    return {
      ...state,
      board: updatedBoard
    };
  })),

  on(BoardActions.addCordSuccess, ((state, { cords }) => {
    return {
      ...state,
      selectedCells: [...state.selectedCells, cords],
      currentBox: { id: cords.id, boxAdded: true }
    };
  })),

  on(BoardActions.addCordFail, ((state, { id }) => {
    return {
      ...state,
      currentBox: { id, boxAdded: false }
    };
  }))
);

export function boardReducer(state: BoardState | undefined, action: Action) {
  return reducer(state, action);
};


function updateCell(grid: DataGrid, cords: DataCell, isActive = true): DataGrid {
  return grid.map((rowList: DataCell[]) => {
    return rowList.map(data => {
      if (hasSameCords(data, cords)) {
        return {
          ...data,
          isActive: isActive
        };
      }
      return data;
    });
  });
}

function hasSameCords(cell: Cords, { row, column }: DataCell): boolean {
  return cell.row === row && cell.column === column;
};
