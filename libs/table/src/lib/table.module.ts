import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { CellComponent } from './cell/cell.component';
import { ActiveCellDirective } from './directives/active-cell.directive';
import { DraggableDirective } from './directives/draggable.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent, CellComponent, ActiveCellDirective, DraggableDirective],
  exports: [TableComponent, CellComponent, ActiveCellDirective, DraggableDirective]
})
export class TableModule {
}
