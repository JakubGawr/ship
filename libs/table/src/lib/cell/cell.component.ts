import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnInit {
  @Input() row;
  @Input() column;
  constructor() { }

  ngOnInit(): void {
  }
  numberToLetter(){
    return String.fromCharCode(65 + this.column);
  }
}
