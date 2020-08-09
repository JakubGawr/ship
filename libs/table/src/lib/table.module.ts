import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { CellComponent } from './cell/cell.component';
import { ActiveCellDirective } from './directives/active-cell.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent, CellComponent, ActiveCellDirective],
  exports: [TableComponent, CellComponent, ActiveCellDirective]
})
export class TableModule {
}
