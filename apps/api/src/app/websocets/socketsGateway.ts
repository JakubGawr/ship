import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Message } from '@ship-game/api-interfaces';

@WebSocketGateway()
export class SocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  logger = new Logger('toServer');
  @SubscribeMessage(Message.FROM_CLIENT)
  handleMessage<T>(client: Socket, payload: T): WsResponse<T> {
    return  {event: Message.FROM_SERVER, data: payload}
  }

  afterInit(server: Server): any {
  }

  handleConnection(client: Socket, ...args): any {
    this.logger.log(`Client connected ${client.id}`)
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected ${client.id}`)
  }
}
