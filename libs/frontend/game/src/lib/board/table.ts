export interface DataCell {
  row: number,
  column: number,
  isActive?: boolean;
  id?: number[];
  shippy?: boolean;
  direction?: 'vertical' | 'horizontal';
  position?: 'last' | 'first';
}

export type DataGrid = Array<DataCell[]>;

export class Table {
  constructor(private _size: number, private columns?: number) {
    this.size = _size;
  }

  create(): DataGrid {
    return new Array(this.size)
      .fill(new Array(this.columns ? this.columns : this.size).fill(null))
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
