import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketService } from '@ship-game/data-connection';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SOCKET_TOKEN } from './tokens';

import { FrontendDashboardModule } from '@ship-game/frontend/dashboard';
import { FrontendGameModule } from '@ship-game/frontend/game';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const config: SocketIoConfig = { url: 'http://localhost:3333', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    FrontendDashboardModule,
    AppRoutingModule,
    FrontendGameModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot([])
  ],
  providers: [
    {
      provide: SOCKET_TOKEN, useClass: SocketService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
