import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animateChild, group, query, animate } from '@angular/animations'

export interface Nav {
  path: string,
  name: string
}

@Component({
  selector: 'ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({
        width: '100%',
      })),
      state('true', style({
        width: '40%',
      })),
      transition('true => false', animate('600ms ease-in-out')),
      transition('false => true', animate('600ms ease-in-out')),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  public navItems: Nav[] = [
    {
     path: 'gra',
     name: 'Rozpocznij grę'
    },
    {
      path: 'zasady',
      name: 'Zasady'
    },
    {
      path: 'statystyki',
      name: 'Statystyki'
    }
  ];

  public collapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  collapseSidebar(){
    this.collapsed = !this.collapsed
  }
}
