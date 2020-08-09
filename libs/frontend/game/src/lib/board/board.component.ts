import { Component, OnInit } from '@angular/core';
import { Table } from './table';

@Component({
  selector: 'ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
 public board: Array<string[]> =  new Table(20).create();
  constructor() { }

  ngOnInit(): void {
  }

}
