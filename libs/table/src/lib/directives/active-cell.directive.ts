import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[activeCell]'
})
export class ActiveCellDirective {
  @HostBinding('class.isActive')
  @Input('activeCell') active = false;

  constructor() {
  }

}
