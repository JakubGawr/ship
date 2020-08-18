import { DataCell, DataGrid, Table } from '../../board/table';
import { Action, createReducer, on } from '@ngrx/store';
import { BoardActions } from '../actions/actions';
import { getSelectedCells } from '../selectors/selectors';

export interface Cords {
  row: number,
  column: number
}

export interface BoxData {
  id: number[],
  boxAdded?: boolean
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
    console.time('STATKI')
    statki(state.board);
    console.timeEnd('STATKI')
    console.time('STATKI2')
    const sorted = state.selectedCells.slice().sort((a, b) => (a.column > b.column) ? 1 : (a.column === b.column) ? ((a.row > b.row) ? 1 : -1) : -1 )
    statki2(sorted);
    console.timeEnd('STATKI2')
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

function statki(board: DataGrid){
  const checked_ships: Cords[] = [];
  const ships: Array<Cords[]> = [];

  let ships_counter = 0;

  for(let row=0; row<board.length; row++){
    for(let column=0; column<board[row].length; column++){
      if(board[row][column].isActive && !checked_ships.some(cord => cord.row === row && cord.column === column)) {
        ships[ships_counter] = [board[row][column]]
        checked_ships.push({row, column})

        let iterator = 1;

        while(board[row + iterator] && board[row + iterator][column].isActive){
          ships[ships_counter].push(board[row + iterator][column])
          checked_ships.push({row: row + iterator, column})
          iterator++;
        }

        iterator = 1;
        while(board[row][column + iterator] && board[row][column + iterator].isActive){
          ships[ships_counter].push(board[row][column + iterator])
          checked_ships.push({row, column: column + iterator})
          iterator++;
        }

        ships_counter++;
      }
    }
  }
  // console.log('STATKI',ships)
}

function statki2(selectedCells: Cords[]){
  const checked_cells: Cords[] = [];
  const ships: Array<Cords[]> = [];

  let ships_counter = 0;

  selectedCells.forEach(cell => {
    if(!checked_cells.some(checkedCell => checkedCell === cell)){
      let iterator = 1;

      ships[ships_counter] = [cell]
      checked_cells.push(cell)

      let nextInRow = findNextInRow(selectedCells, cell, iterator)
      let nextInCol = findNextInColumn(selectedCells, cell, iterator)

      while((nextInRow && !checked_cells.some(checkedCell => checkedCell === nextInRow)) || (nextInCol && !checked_cells.some(checkedCell => checkedCell === nextInCol))){
        iterator++;
        if(nextInRow){
          checked_cells.push(nextInRow);
          ships[ships_counter].push(nextInRow);
          nextInRow = findNextInRow(selectedCells, cell, iterator)
        } else {
          checked_cells.push(nextInCol);
          ships[ships_counter].push(nextInCol);
          nextInCol = findNextInColumn(selectedCells, cell, iterator)
        };
      }
      ships_counter++;
    }
  });
  // console.log('STATKI',ships)
}

function findNextInRow(selectedCells, currentCell, iterator){
  return selectedCells.find((nextCell: Cords) => nextCell.row === currentCell.row + iterator && nextCell.column === currentCell.column);
}

function findNextInColumn(selectedCells, currentCell, iterator){
  return selectedCells.find((nextCell: Cords) => nextCell.row === currentCell.row && nextCell.column === currentCell.column + iterator);
}