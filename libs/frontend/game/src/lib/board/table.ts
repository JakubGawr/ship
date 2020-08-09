export interface DataCell {
  row: number,
  column: number,
  isActive: boolean;
}

export type DataGrid = Array<DataCell[]>;

export class Table {
  constructor(private _size: number) {
    this.size = _size;
  }

  create(): DataGrid {
    return new Array(this.size)
      .fill(new Array(this.size).fill(null))
      .map((rowArray, row) => {
        return rowArray.map((_, column) => ({ row, column, isActive: false }));
      });
  }

  get size() {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

}
