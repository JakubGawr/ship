import { DataCell } from '../../board/table';
import { Cords, ElementFlow } from './reducer';

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


function elementsController(currentCords: Cords[]) {
  console.time('jeden');
  const result1 = findShips(deepCopy(currentCords, 'row'), 'row');
  console.log(deepCopy(currentCords, 'row'));
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
  return [...list.map((cord) => ({ ...cord }))].sort((a, b) =>
    a.column > b.column
      ? 1
      : a.column === b.column
      ? a.row > b.row
        ? 1
        : -1
      : -1
  );
}

function finder(
  arr: Cords[],
  element: Cords,
  destinantion: 'column' | 'row' = 'row',
  container
) {
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
  return list.find((a) => {
    return (
      a[destination] === currentElement[destination] + 1 &&
      a[oppositeDestination(destination)] ===
      currentElement[oppositeDestination(destination)]
    );
  });
}

function oppositeDestination(destination: ElementFlow): ElementFlow {
  return destination === 'column' ? 'row' : 'column';
}
