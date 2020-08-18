import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { CellComponent } from './cell/cell.component';
import { ActiveCellDirective } from './directives/active-cell.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { DestroyBoxDirective } from './directives/destroy-box.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent, CellComponent, ActiveCellDirective, DraggableDirective, DestroyBoxDirective],
  exports: [TableComponent, CellComponent, ActiveCellDirective, DraggableDirective, DestroyBoxDirective]
})
export class TableModule {
}
