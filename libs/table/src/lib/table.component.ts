import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() size: number;
  constructor(private renderer: Renderer2, public element: ElementRef) { }

  ngOnInit(): void {
    this.element.nativeElement.style = `grid-template-columns: 30px repeat(${this.size}, var(--cell-size))`
  }
}
