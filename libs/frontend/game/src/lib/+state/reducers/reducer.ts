import { DataCell, DataGrid, Table } from '../../board/table';
import { Action, createReducer, on } from '@ngrx/store';
import { BoardActions } from '../actions/actions';
import has = Reflect.has;

export type ElementFlow = 'column' | 'row'

export interface Cords {
  row: number;
  column: number;
  isExternal?: boolean;
}

export interface BoxData {
  id: number[];
  boxAdded: boolean;
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
    elementsController(state.selectedCells);
    // statki(state.board);
    return {
      ...state,
      selectedCells: [...state.selectedCells, cords],
      currentBox: { id: cords.id, boxAdded: true },
      board: updatedBoard
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

function sortGrid(
  destination: 'column' | 'row',
  currentCells: Cords[]
): Cords[] {

  return [...currentCells].sort((a, b) => a[destination] - b[destination]);
}


let cos = [];
let resul = [];

function statki(board: DataGrid) {
  console.time('jeden');

  const sprawdzone = [];
  const statki = [];

  let ships_counter = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].isActive && !sprawdzone.some(cord => cord.row === i && cord.col === j)) {
        statki[ships_counter] = [];
        statki[ships_counter].push(board[i][j]);
        let iterator = 1;

        if (board[i + 1][j] && board[i + 1][j].isActive) {
          while (board[i + iterator][j].isActive) {
            statki[ships_counter].push(board[i + iterator][j]);
            sprawdzone.push({ row: i + iterator, col: j });
            iterator++;
          }
        } else if (board[i][j + 1] && board[i][j + 1].isActive) {
          while (board[i][j + iterator].isActive) {
            statki[ships_counter].push(board[i][j + iterator]);
            sprawdzone.push({ row: i, col: j + iterator });
            iterator++;
          }
        }

        sprawdzone.push({ row: i, col: j });
        ships_counter++;
        iterator = 0;
      }
    }
  }
  console.timeEnd('jeden');
  console.log('STATKI', statki);
}

function elementsController(currentCords: Cords[]) {
  console.time('jeden');
  const result1 = findShips(deepCopy(currentCords, 'row'), 'row');
  console.log(deepCopy(currentCords, 'row'))
 // const result2 = findShips(deepCopy(currentCords, 'column'), 'column');
  console.timeEnd('jeden');
  cos = [];
}

function findShips(list: Cords[], destination: ElementFlow) {
  let container = [];
  const result = [];
  list.forEach((element) => {
    if (element.isExternal) return;
    const find = finder(list, element, destination, container);
    if (find.length > 0) {
      result.push(find);
    }
    container = [];
  }, []);
  return result;
}

function deepCopy(list: Cords[], destination: ElementFlow): Cords[] {
  return [...list.map(cord => ({ ...cord }))].sort((a, b) => (a.column > b.column) ? 1 : (a.column === b.column) ? ((a.row > b.row) ? 1 : -1) : -1 )
}


function finder(arr: Cords[], element: Cords, destinantion: 'column' | 'row' = 'row', container) {
  const currentElement = element;
  const siblingElm = siblingElement(arr, currentElement, destinantion);
  if (siblingElm) {
    container.push(element);
    element.isExternal = true;
    return finder(arr, siblingElm, destinantion, container);
  } else {
    return container;
  }
}

function siblingElement(
  list: Cords[],
  currentElement: Cords,
  destination: 'column' | 'row'
) {
  return list.find(a => {
    return a[destination] === currentElement[destination] + 1
      && a[oppositeDestination(destination)] === currentElement[oppositeDestination(destination)];
  });
}

function oppositeDestination(destination: ElementFlow): ElementFlow {
  return destination === 'column' ? 'row' : 'column';
}
