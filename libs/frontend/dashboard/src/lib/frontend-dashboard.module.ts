import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { LogoComponent } from './logo/logo.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SidebarComponent, SidebarItemComponent, LogoComponent, HomePageComponent],
  exports: [SidebarComponent, SidebarItemComponent, LogoComponent, HomePageComponent]
})
export class FrontendDashboardModule {}
