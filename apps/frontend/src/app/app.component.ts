import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ship-game/api-interfaces';
import { SocketModel } from '@ship-game/data-connection';
import { SOCKET_TOKEN } from './tokens';

@Component({
  selector: 'ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(@Inject(SOCKET_TOKEN) private socketService: SocketModel) {}

  ngOnInit(): void {
    // this.socketService.sendData('3333')
    // this.socketService.onServerData();
  }
}
