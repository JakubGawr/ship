import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketService } from '@ship-game/data-connection';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SOCKET_TOKEN } from './tokens';

const config: SocketIoConfig = { url: 'http://localhost:3333', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
      provide: SOCKET_TOKEN , useClass: SocketService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
