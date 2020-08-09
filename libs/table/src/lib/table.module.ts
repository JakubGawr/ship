import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent, CellComponent],
  exports: [TableComponent, CellComponent]
})
export class TableModule {
}
