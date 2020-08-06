import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

export interface Nav {
  path: string,
  name: string
}

@Component({
  selector: 'ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  navItems: Nav[] = [
    {
     path: 'gra',
     name: 'Gra'
    },
    {
      path: 'wyniki',
      name: 'Wyniki'
    },
    {
      path: 'ustawienia',
      name: 'Ustawienia'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
