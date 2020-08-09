import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnInit {
  @Input() cords: [number,number];
  constructor() { }

  ngOnInit(): void {
  }

}
