import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketsGateway } from './websockets/sockets.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SocketsGateway],
})
export class AppModule {}
