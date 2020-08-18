import {
  AfterContentInit, AfterViewInit,
  ContentChild,
  Directive,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[destroyBox]'
})
export class DestroyBoxDirective implements AfterViewInit {
  @ContentChild(DraggableDirective) draggable: DraggableDirective;

  constructor(
    private template: TemplateRef<ElementRef>,
    private viewContainerRef: ViewContainerRef) {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
  ngAfterViewInit(): void {
    console.log(this.draggable)
  }

  destroy() {
    this.viewContainerRef.clear();
  }

  append() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

}
