import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendDbConnectModule } from '@ship-game/backend/db-connect';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { SocketsGateway } from './websockets/sockets.gateway';

@Module({
  imports: [BackendDbConnectModule, UserModule],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    SocketsGateway,
  ],
})
export class AppModule {}
