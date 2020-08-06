import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Nav } from '../../containers/sidebar/sidebar.component';

@Component({
  selector: 'ui-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarItemComponent implements OnInit {
  @Input() sidebarItem: Nav;

  constructor() {
  }

  ngOnInit(): void {

  }

}
