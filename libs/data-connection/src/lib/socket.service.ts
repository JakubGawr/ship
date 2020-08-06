import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketModel } from './socket.interface';
import { Message } from '@ship-game/api-interfaces';

@Injectable()
export class SocketService implements SocketModel{
  constructor(private socket: Socket) {
  }

  connect(){
    this.socket.connect();
  }

  disconnect(){
    this.socket.disconnect();
  }

  onServerData(){
    this.socket.on(Message.FROM_SERVER, (m) => console.log(m, 'o'))
  }

  sendData(data:string){
    this.socket.emit(Message.FROM_CLIENT, data);
  }
}
