export class Table {

  constructor(private _size: number) {
    this.size = _size;
  }

  create(): Array<string[]> {
   return  new Array(this.size).fill(new Array(this.size).fill('1fr'));
  }

  get size(){
    return this._size;
  }
  set size(value: number){
     this._size = value;
  }

}
