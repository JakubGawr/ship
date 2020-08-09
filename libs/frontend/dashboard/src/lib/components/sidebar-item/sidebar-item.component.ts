import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Nav } from '../../containers/sidebar/sidebar.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ui-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  animations: [
    trigger('collapseItem', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('400ms 100ms', style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms 100ms', style({ transform: 'scale(0)' }))
      ])
    ]),
    trigger('collapseItem2', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('300ms 300ms', style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('100ms', style({ transform: 'scale(0)' }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarItemComponent {
  @Input() sidebarItem: Nav;
  @Input() isCollapsed: boolean;
}
