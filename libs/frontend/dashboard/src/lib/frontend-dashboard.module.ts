import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { LogoComponent } from './logo/logo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SidebarComponent, SidebarItemComponent, LogoComponent],
  exports: [SidebarComponent, SidebarItemComponent, LogoComponent]
})
export class FrontendDashboardModule {}
