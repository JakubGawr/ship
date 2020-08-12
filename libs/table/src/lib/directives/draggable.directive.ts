import {
  AfterViewInit,
  ChangeDetectorRef, ContentChild,
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  NgZone, OnDestroy,
  OnInit, Optional,
  Output, Renderer2, Self, SkipSelf, TemplateRef, ViewChild
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CellComponent, TableComponent } from '@ship-game/table';
import { DestroyBoxDirective } from './destroy-box.directive';
import { BoxData } from '../../../../frontend/game/src/lib/+state/reducers/reducer';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[draggableBox]'
})
export class DraggableDirective implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(TemplateRef) box;
  @Input('draggableBox') id: number[];

  @Input() set boxData(value: BoxData) {
    if (!value) return;
    if (this.hasEqualIds(this.id, value.id)) {
      if (value.boxAdded) {
        this.renderer.removeChild(this.host.nativeElement, this.host.nativeElement);
      } else {
        this.host.nativeElement.style.position = 'static';
      }
    }
  }

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
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    const drag$ = fromEvent(this.host.nativeElement, 'mousedown');
    const drop$ = fromEvent(document.body, 'mouseup');
    const move$ = fromEvent(document.body, 'mousemove');
    this.ngZone.runOutsideAngular(() => {
      drag$
        .pipe(
          switchMap(() => move$.pipe(
            takeUntil(drop$.pipe(tap(this.onDrop.bind(this)))))),
          tap((event: MouseEvent) => {
            this.host.nativeElement.style.position = 'absolute';
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

  ngOnDestroy(): void {
  }

  hasEqualIds(hostIds: number[], currentIds: number[]) {
    return hostIds.every((ids, index) => currentIds[index] === ids);
  }

  onDrop() {
    const { x, y } = this.table.element.nativeElement.getBoundingClientRect();
    const row = this.getRowPostion(y, this.boxCords.mouseY);
    const column = this.getColumnPosition(x, this.boxCords.mouseX);
    if (!this.outOfTable(row, column)) {
      this.cellSelect.emit({ row, column, id: this.id });
      this.cdr.detectChanges();
    }
  }

  outOfTable(row, column) {
    return !((row > -1 && row <= this.table.size) && (column > -1 && column <= this.table.size));
  }

  getRowPostion(gridY: number, mouseY: number) {
    return Math.floor((mouseY - gridY - 16 - 1) / 45);
  }

  getColumnPosition(gridX: number, mouseX: number) {
    return Math.floor((mouseX - gridX - 30 - 16 - 1) / 45);
  }
}
