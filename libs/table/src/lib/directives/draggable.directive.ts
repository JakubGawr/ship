import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  NgZone,
  OnInit,
  Output, TemplateRef
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CellComponent, TableComponent } from '@ship-game/table';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[draggableBox]'
})
export class DraggableDirective implements OnInit, AfterViewInit {
  @Output() cellSelect = new EventEmitter();
  cell: CellComponent;
  #table: TableComponent;
  get table() {
    return this.#table;
  }

  set table(value: TableComponent) {
    this.#table = value;
  }

  boxCords: { mouseX: number, mouseY: number } = { mouseX: 0, mouseY: 0 };

  constructor(
    private host: ElementRef,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.host.nativeElement.style.position = 'absolute';
    const drag$ = fromEvent(this.host.nativeElement, 'mousedown');
    const drop$ = fromEvent(document.body, 'mouseup');
    const move$ = fromEvent(document.body, 'mousemove');
    this.ngZone.runOutsideAngular(() => {
      drag$
        .pipe(
          switchMap(() => move$.pipe(
            takeUntil(drop$.pipe(tap(this.onDrop.bind(this)))))),
          tap((event: any) => {
            this.boxCords = { mouseX: event.clientX, mouseY: event.clientY };
            this.host.nativeElement.style.top = event.clientY - 45 / 2 + 'px';
            this.host.nativeElement.style.left = event.clientX - 45 / 2 + 'px';
          })
        )
        .subscribe();
    });
  }

  ngAfterViewInit(): void {
  }

  onDrop() {
    const { x, y } = this.table.element.nativeElement.getBoundingClientRect();
    const row = this.getRowPostion(y, this.boxCords.mouseY);
    const column = this.getColumnPosition(x, this.boxCords.mouseX);
    if (!this.outOfTable(row, column)) {
      this.cellSelect.emit({ row, column, isActive: false });
      this.cdr.detectChanges();
    }
  }

  outOfTable(row, column) {
    return !(row > -1 && row <= this.table.size) && (column > -1 && column <= this.table.size);
  }

  getRowPostion(gridY: number, mouseY: number) {
    return Math.floor((mouseY - gridY - 1) / 45);
  }

  getColumnPosition(gridX: number, mouseX: number) {
    return Math.floor((mouseX - gridX - 30 - 1) / 45);
  }
}
