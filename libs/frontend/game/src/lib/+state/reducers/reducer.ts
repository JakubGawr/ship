import { DataCell, DataGrid, Table } from '../../board/table';
import { Action, createReducer, on } from '@ngrx/store';
import { BoardActions } from '../actions/actions';
import { getSelectedCells } from '../selectors/selectors';

export type ElementFlow = 'column' | 'row';

export interface Cords {
  row: number;
  column: number;
  isExternal?: boolean;
}

export interface BoxData {
  id: number[];
  boxAdded?: boolean;
}

export interface BoardState {
  board: DataGrid;
  selectedCells: Cords[];
  playerAction: boolean;
  currentBox: BoxData;
}

const initialState: BoardState = {
  board: new Table(10).create(),
  selectedCells: [],
  playerAction: true,
  currentBox: null
};

const reducer = createReducer(
  initialState,
  on(BoardActions.initCustomBoard, (state, { board }) => {
    return {
      ...state,
      board
    };
  }),

  on(BoardActions.addCordSuccess, (state, { cords }) => {
    const updatedBoard = updateCell(state.board, cords, true);
    const selectedCells = [...state.selectedCells, cords];
    const sorted = selectedCells.slice()
      .sort((a, b) =>
        (a.column > b.column) ? 1 : (a.column === b.column) ? ((a.row > b.row) ? 1 : -1) : -1);
    const a = appendShips(statki2(sorted), updatedBoard);
    return {
      ...state,
      selectedCells,
      currentBox: { id: cords.id, boxAdded: true },
      board: a
    };
  }),

  on(BoardActions.addCordFail, (state, { id }) => {
    return {
      ...state,
      currentBox: { id, boxAdded: false }
    };
  })
);

export function boardReducer(state: BoardState | undefined, action: Action) {
  return reducer(state, action);
}

function appendShips(ships: any, dataGrid: any) {
  return dataGrid.map((rowList: DataCell[]) => {
    return rowList.map((data) => {
      const okeyShip = findOkShip(data, ships);
      if (okeyShip) {
        return {
          ...data,
          ...okeyShip
        };
      } else {
        return {
          ...data
        };
      }
    });
  });
}

function findOkShip(data: DataCell, ships: Array<DataCell[]>): DataCell {
  let ship = null;
  ships.forEach(jd => {
    jd.forEach(jp => {
      if (jp.row === data.row && jp.column === data.column) {
        ship = jp;
      }
    });

  });
  return ship;
}

function updateCell(
  grid: DataGrid,
  cords: DataCell,
  isActive = true
): DataGrid {
  return grid.map((rowList: DataCell[]) => {
    return rowList.map((data) => {
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
}

function statki2(selectedCells: DataCell[]) {
  const checked_cells: DataCell[] = [];
  const ships: Array<DataCell[]> = [];

  let ships_counter = 0;

  selectedCells.forEach((cell) => {
    if (!checked_cells.some((checkedCell) => checkedCell === cell)) {
      let iterator = 1;
      ships[ships_counter] = [cell];
      checked_cells.push(cell);

      let nextInRow = findNextInRow(selectedCells, cell, iterator);
      let nextInCol = findNextInColumn(selectedCells, cell, iterator);

      while (hasCell(checked_cells, nextInRow, nextInCol)) {
        iterator++;
        if (nextInRow) {
          checked_cells.push(nextInRow);
          ships[ships_counter].push({
            ...nextInRow, direction: 'horizontal'
          });
          ships[ships_counter][0].direction = 'horizontal';
          nextInRow = findNextInRow(selectedCells, cell, iterator);
        } else {
          checked_cells.push(nextInCol);
          ships[ships_counter].push({
            ...nextInCol, direction: 'vertical'
          });
          ships[ships_counter][0].direction = 'vertical';

          nextInCol = findNextInColumn(selectedCells, cell, iterator);
        }
      }
      ships_counter++;
    }
  });
  return ships.map(ship => ship.map((shipper, i) => {
    console.log(shipper, i);
    return {
      ...shipper,
      position: i === 0 ? 'first' : i === ship.length - 1 ? 'last' : undefined
    };
  }));
}

function hasCell(
  checked_cells: Cords[],
  nextInRow: Cords,
  nextInCol: Cords
): boolean {
  return (
    (nextInRow &&
      !checked_cells.some((checkedCell) => checkedCell === nextInRow)) ||
    (nextInCol &&
      !checked_cells.some((checkedCell) => checkedCell === nextInCol))
  );
}

function findNextInRow(
  selectedCells: Cords[],
  currentCell: Cords,
  iterator: number
): Cords {
  return selectedCells.find(
    (nextCell: Cords) =>
      nextCell.row === currentCell.row + iterator &&
      nextCell.column === currentCell.column
  );
}

function findNextInColumn(
  selectedCells: Cords[],
  currentCell: Cords,
  iterator: number
): Cords {
  return selectedCells.find(
    (nextCell: Cords) =>
      nextCell.row === currentCell.row &&
      nextCell.column === currentCell.column + iterator
  );
}
