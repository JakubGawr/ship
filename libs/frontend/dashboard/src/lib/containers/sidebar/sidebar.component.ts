import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { trigger, state, style, transition, animateChild, group, query, animate } from '@angular/animations'

export interface Nav {
  path: string,
  name: string,
  active: boolean,
  icon: string,
}

@Component({
  selector: 'ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('collapseText',[
      transition(':leave', [
        animate('300ms 100ms', style({transform: 'scale(0)'}))
      ]),
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate('400ms 100ms', style({transform: 'scale(1)'}))
      ])
    ]),
    trigger('collapseText2',[
      transition(':leave', [
        animate('100ms', style({transform: 'scale(0)'}))
      ]),
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate('300ms 300ms', style({transform: 'scale(1)'}))
      ])
    ]),
    trigger('collapse', [
      state('open', style({
        width: '200px'
      })),
      state('close', style({
        width: '60px',
      })),
      transition('open => close', group([
        query('@collapseText', animateChild()),
        query('@collapseText2', animateChild()),
        query('@collapseItem', animateChild()),
        query('@collapseItem2', animateChild()),
        animate('600ms ease-in-out')
      ])),
      transition('close => open', group([
        query('@collapseText', animateChild()),
        query('@collapseText2', animateChild()),
        query('@collapseItem', animateChild()),
        query('@collapseItem2', animateChild()),
        animate('600ms ease-in-out')
      ])),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  public navItems: Nav[] = [{
      path: 'gra',
      name: 'Rozpocznij gre',
      active: false,
      icon: 'play.svg'
    },{
      path: 'zasady',
      name: 'Zasady',
      active: false,
      icon: 'rules.svg'
    },{
      path: 'statystyki',
      name: 'Statystyki',
      active: false,
      icon: 'statistics.svg'
    }];

  public isCollapsed = false;
  public isToggled = 'open'

  constructor() { }

  ngOnInit(): void {
    
  }

  onActive(event){
    console.log(event)
  }

  collapseSidebar(){
    this.isCollapsed = !this.isCollapsed;
    this.isToggled = this.isCollapsed ? 'close' : 'open'
  }
}
