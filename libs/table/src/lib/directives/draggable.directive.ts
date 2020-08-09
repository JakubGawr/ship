import { Directive, DoCheck, ElementRef, Host, NgZone, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[draggable]'
})
export class DraggableDirective implements OnInit, DoCheck {

  constructor(private host: ElementRef, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.host.nativeElement.style.position = 'absolute';
    const drag$ = fromEvent(this.host.nativeElement, 'mousedown');
    const drop$ = fromEvent(document.body, 'mouseup');
    const move$ = fromEvent(document.body, 'mousemove');
    this.ngZone.runOutsideAngular(() => {
      drag$
        .pipe(
          switchMap(() => move$.pipe(takeUntil(drop$))),
          tap((event) => {
            this.host.nativeElement.style.top = event.clientY - 20 + 'px';
            this.host.nativeElement.style.left = event.clientX - 20 + 'px';
          })
        )
        .subscribe();
    })
  }

  ngDoCheck(): void {
    console.log('checkam');
  }

}
