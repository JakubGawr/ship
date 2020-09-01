import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataCell } from '../../../../frontend/game/src/lib/board/table';

@Component({
  selector: 'ui-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnInit {
  @Input() data: DataCell;
  @Output() cellSelect = new EventEmitter<DataCell>();

  constructor(public element: ElementRef) {
  }

  ngOnInit(): void {
  }

  equals(toCompare: string, comparer: any) {
    return toCompare === comparer
  }

  numberToLetter() {
    return String.fromCharCode(65 + this.data.column);
  }

  onCellClick() {
    this.cellSelect.emit(this.data);
  }

  get height() {
    return this.element.nativeElement.innerHeight;
  }
}
